import type { handler } from 'eviate';

export interface FileMiddleware {
  method: string;
  run: handler;
}
