import { readdirSync, lstatSync } from 'fs';
import path from 'path';


import { Plugin } from '../plugin';

import type { FileSystemMiddlewareInterface } from './interfaces/file-system-router';

export class FileSystemRouter extends Plugin {
  private options: FileSystemMiddlewareInterface;

  constructor(options: FileSystemMiddlewareInterface) {
    super({
      title: 'File System Router',
      description:
        'A plugin that allows you to use the file system to auto load routes and middlewares',
      version: '1.0.0'
    });

    this.options = options;
  }

  public get settings() {
    return {};
  }

  public middlewares(app: any): void {
    const middlewarePath: string = path.join(
      process.cwd(),
      this.options.middlewareDir
    );

    readdirSync(middlewarePath).forEach(async (file: string) => {
      const middleware = await import(`${middlewarePath}/${file}`);

      app.use('start', middleware.middleware.run);
    });
  }

  private async logFile(file: string, path: string, app: any) {
    if (file.endsWith('.js') || file.endsWith('.ts')) {
      const code = await import(`${path}/${file}`);

      if (!code.route) throw new Error('Sunrit implement');

      const regex = /\[(\w+)\]/;
      const result = file.match(regex);

      if (result) file = ':' + result[1];

      const rmPath = path
        .replace(process.cwd(), '')
        .replace(this.options.routerDir, '');
      const routePath = rmPath + '/' + file.replace('.ts' || '.js', '');

      app.get(routePath, code.route.run);
    }
  }

  private logDir(file: string, app: any) {
    readdirSync(file).forEach(async (dir: string) => {
      const dirFile = await lstatSync(`${file}/${dir}`);

      if (dirFile.isDirectory()) {
        this.logDir(`${file}/${dir}`, app);
      }

      if (dirFile.isFile()) {
        await this.logFile(dir, file, app);
      }
    });
  }

  public handler(app: any): void {
    this.routesLog(app)
    this.middlewares(app)
  }

  public routesLog(app: any) {
    const routePath: string = path.join(process.cwd(), this.options.routerDir);

    readdirSync(routePath).forEach(async (dir: string) => {
      const file = await lstatSync(`${routePath}/${dir}`);

      if (file.isDirectory()) {
        this.logDir(`${routePath}/${dir}`, app);
      }

      if (file.isFile()) {
        await this.logFile(dir, routePath, app);
      }
    });
  }
}
