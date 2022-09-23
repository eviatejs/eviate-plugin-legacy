import type { Context, EviateMiddlewareResponse } from 'eviate';

export const middleware = {
  name: 'logger',

  run: (ctx: Context): EviateMiddlewareResponse => {
    console.log(ctx.path);

    return {
      ctx: ctx
    };
  }
};
