import type { MiddlewareHandler } from 'eviate';

export interface FileMiddleware {
  name: string;
  position: string;
  run: MiddlewareHandler;
}
