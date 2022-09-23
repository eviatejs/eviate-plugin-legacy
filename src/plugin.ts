import type { AppMetadata } from './schema/AppMetadata';
import { Engine } from 'eviate';
export abstract class Plugin {
  private metaData: AppMetadata;
  constructor(meta: AppMetadata) {
    this.metaData = meta;
  }

  abstract middlewares(app: Engine): void;
  abstract routes(app: Engine): void;
}
