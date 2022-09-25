import { Engine, EventEmitter } from 'eviate';

import { defaultAppMetadataValue } from './schema/AppMetadata';

import type { AppMetadata } from './schema/AppMetadata';
import type { PluginSettings } from './interfaces/plugin-settings';

export abstract class Plugin {
  public readonly event: EventEmitter;

  private _metadata: AppMetadata;

  constructor(metadata: AppMetadata) {
    this._metadata = { ...defaultAppMetadataValue, ...metadata };

    this.event = new EventEmitter();
  }

  public get metadata(): AppMetadata {
    return this._metadata;
  }

  public abstract handler(app: Engine): void;

  abstract get settings(): PluginSettings;
}
