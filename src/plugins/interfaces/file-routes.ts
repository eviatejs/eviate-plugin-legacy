import type { handler } from 'eviate';

export interface FileRoute {
  method: string;
  run: handler;
}
