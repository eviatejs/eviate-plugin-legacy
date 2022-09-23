import { Context,EviateMiddlewareResponse } from "eviate";


export const event = {
    name: "messageCreate",
    run: (ctx:Context) :EviateMiddlewareResponse => {
    console.log(ctx.path)
    return {
        ctx:ctx
    }
}
}
