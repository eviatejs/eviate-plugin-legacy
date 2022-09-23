import { readdirSync } from 'fs';
import path from 'path';

import { Engine } from 'eviate';

import { Plugin } from '../plugin';

import { FileSystemInterface } from './interfaces/file-system-router';

export class FileSystemRouter extends Plugin {
  private options: FileSystemInterface;

  constructor(options: FileSystemInterface) {
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

  public middlewares(app: Engine): void {
    const eventPath: string = path.join(
      process.cwd(),
      this.options.middlewareDir
    );

    console.log(eventPath);

    readdirSync(eventPath).forEach(async (file: string) => {
      const middleware = await import(`${eventPath}/${file}`);
      console.log(middleware.event.run);
      console.log(`${eventPath}/${file}`, 'uh');
      app.use('start', middleware.event.run);
    });
  }

  public routes(app: Engine): void {}
}
