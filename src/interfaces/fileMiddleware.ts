import { MiddlewareHandler } from 'eviate';
export interface fileMiddleware {
  name: string;
  run: MiddlewareHandler;
}
