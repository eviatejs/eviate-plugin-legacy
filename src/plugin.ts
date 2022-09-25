import { EventEmitter, MiddlewarePosition } from 'eviate';

import { defaultAppMetadataValue } from './schema/AppMetadata';

import type { Context } from 'eviate';
import type { AppMetadata } from './schema/AppMetadata';
import type { PluginSettings } from './interfaces/plugin-settings';

type MiddlewarePositionKeys = keyof typeof MiddlewarePosition;
type MiddlewarePositionValues =
  typeof MiddlewarePosition[MiddlewarePositionKeys];
interface Route {
  route: string;
  method: string;
  handler: (ctx: Context) => any;  // Add fine-grained type
}

interface Middleware {
  position: string;
  route: string;
  handler: (ctx: Context) => any;  // Add fine-grained type
}

// Decorators for route and middleware, which are used to register routes and middlewares
export function route(route: string, method: string) {
  return function (target: any, _: string, descriptor: PropertyDescriptor) {
    target._routes.push({ route, method, handler: descriptor.value });
  };
}

export function middleware(position: MiddlewarePositionValues, route: string) {
  return function (target: any, _: string, descriptor: PropertyDescriptor) {
    target._middlewares.push({ position, route, handler: descriptor.value });
  };
}

export abstract class Plugin {
  public readonly event: EventEmitter;

  public _routes: Route[];
  public _middlewares: Middleware[];

  private _metadata: AppMetadata;

  constructor(metadata: AppMetadata) {
    this._metadata = { ...defaultAppMetadataValue, ...metadata };

    this.event = new EventEmitter();

    this._routes = [];
    this._middlewares = [];
  }

  public get routes(): Route[] {
    return this._routes;
  }

  public get metadata(): AppMetadata {
    return this._metadata;
  }

  abstract get settings(): PluginSettings;
}
