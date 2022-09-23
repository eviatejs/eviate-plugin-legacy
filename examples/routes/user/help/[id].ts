import { Context } from "eviate";

export const route = {
  name: "GET",
  run: (ctx:Context) => {
    return {
        text: ctx.params.id
    }
  }
}