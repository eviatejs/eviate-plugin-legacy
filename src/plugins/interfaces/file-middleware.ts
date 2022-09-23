import type { MiddlewareHandler } from 'eviate';

export interface FileMiddleware {
  name: string;
  run: MiddlewareHandler;
}
