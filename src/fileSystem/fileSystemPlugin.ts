import { Engine } from 'eviate';
import { Plugin } from '../plugin';
import { readdirSync, lstatSync } from 'fs';
import path, { resolve } from 'path';
import { AppMetadata } from '../schema/AppMetadata';
import { FileSystemMiddlewareInterface } from '../interfaces/fileSystem';
export class FileSystem extends Plugin {
  private options: FileSystemMiddlewareInterface;
  constructor(options: FileSystemMiddlewareInterface, meta: AppMetadata) {
    super(meta);
    this.options = options;
  }
  public middlewares(app: Engine): void {
    const middlewarePath: string = path.join(
      process.cwd(),
      this.options.middlewareDir
    );
    readdirSync(middlewarePath).forEach(async (file: string) => {
      const middleware = await import(`${middlewarePath}/${file}`);
      app.use('start', middleware.middleware.run);
    });
  }
  
   private async logFile(file: string, path: string, app:Engine) {
  
    if(file.endsWith(".js") || file.endsWith(".ts")){
     const code = await import(`${path}/${file}`)
     if(!code.route) throw new Error("Sunrit implement")
     const regex = /\[(\w+)\]/;
     const result = file.match(regex)
     if(result) file = ":" + result[1]
     const rmPath = path.replace(process.cwd(), "").replace(this.options.routerDir, "")
     const routePath = rmPath + "/" + file.replace(".ts" || ".js", "")
     app.get(routePath, code.route.run)
    }
   }

   private logDir(file: string, app:Engine) {
     
     readdirSync(file).forEach(async (dir: string) => { 
      const dirFile = await lstatSync(`${file}/${dir}`)
      if(dirFile.isDirectory()) {
        this.logDir(`${file}/${dir}`, app)
      }
      if(dirFile.isFile()) {
       await this.logFile(dir, file, app)
      }
     })
   }
   
   public routes(app: Engine) {
    const routePath: string = path.join(process.cwd(), this.options.routerDir);
    readdirSync(routePath).forEach(async (dir: string) => {
      const file = await lstatSync(`${routePath}/${dir}`)
      if(file.isDirectory()) {
        this.logDir(`${routePath}/${dir}`, app)
      }
      if(file.isFile()) {
       await this.logFile(dir, routePath, app)
      }
})    
}
}
