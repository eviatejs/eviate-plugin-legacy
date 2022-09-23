import { Engine } from "eviate";

const app:Engine = new Engine();

app.get("/", ctx => {
    return {
        status:200,
        text: "Hello World",
        headers: {
           //place holder i forgot the utf header and i dont wanna google
        }
    }
})

app.listen({port: 3000})