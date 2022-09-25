import { Engine } from 'eviate';
import event, { Emitter } from 'event-emitter';

import { defaultAppMetadataValue } from './schema/AppMetadata';

import type { AppMetadata } from './schema/AppMetadata';
import type { PluginSettings } from './interfaces/plugin-settings';

interface Route {
  route: string;
  method: string;
}

export abstract class Plugin {
  public readonly event: Emitter;
  protected _routes: Route[];

  private metadata: AppMetadata;

  constructor(metadata: AppMetadata) {
    this.metadata = { ...defaultAppMetadataValue, ...metadata };

    this.event = event();
    this._routes = [];
  }

  public get routes(): Route[] {
    return this._routes;
  }

  abstract get settings(): PluginSettings;

  abstract middlewares(app: Engine): void;

  // Route decorator
  public get pluginMetaData() : AppMetadata {
    return this.metadata
  }
  public route = (route: Route) => {
    return (target: Function) => {
      this._routes.push(route);
    }
  }
}
