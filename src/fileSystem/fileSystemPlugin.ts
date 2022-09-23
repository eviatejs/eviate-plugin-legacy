import { Engine } from "eviate";
import {Plugin} from "../plugin"
import { readdirSync } from "fs";
import path from "path"
import { AppMetadata } from "../schema/AppMetadata";
import { FileSystemInterface } from "../interfaces/fileSystem";
export class FileSystem extends Plugin {
    private options: FileSystemInterface
    constructor(options:FileSystemInterface, meta: AppMetadata){
        super(meta)
        this.options = options
    }
    public middlewares(app: Engine): void {
        
    const eventPath: string = path.join(process.cwd(), this.options.middlewareDir);
    console.log(eventPath)
    readdirSync(eventPath).forEach(async (file: string) => {
      const middleware  = await import(`${eventPath}/${file}`);
      console.log(middleware.event.run)
      console.log(`${eventPath}/${file}`, "uh")
      app.use("start", middleware.event.run)
    });
    }
    public routes(app: Engine): void {
        
    }
}