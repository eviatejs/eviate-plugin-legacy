import { Engine } from 'eviate';
import event, { Emitter } from 'event-emitter';

import { AppMetadataSchema } from './schema/AppMetadata';

import type { AppMetadataInput, AppMetadataOutput } from './schema/AppMetadata';
import type { PluginSettings } from './interfaces/plugin-settings';

export abstract class Plugin {
  public readonly event: Emitter;

  private metadata: AppMetadataOutput;

  constructor(metadata: AppMetadataInput) {
    this.metadata = AppMetadataSchema.parse(metadata);

    this.event = event();
  }

  abstract get settings(): PluginSettings;

  abstract middlewares(app: Engine): void;
  abstract routes(app: Engine): void;
}
