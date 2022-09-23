import { Engine } from 'eviate';
import event, { Emitter } from 'event-emitter';

import { defaultAppMetadataValue } from './schema/AppMetadata';

import type { AppMetadata } from './schema/AppMetadata';
import type { PluginSettings } from './interfaces/plugin-settings';

export abstract class Plugin {
  public readonly event: Emitter;

  private metadata: AppMetadata;

  constructor(metadata: AppMetadata) {
    this.metadata = { ...defaultAppMetadataValue, ...metadata };

    this.event = event();
  }

  abstract get settings(): PluginSettings;

  abstract middlewares(app: Engine): void;
  abstract routes(app: Engine): void;
}
