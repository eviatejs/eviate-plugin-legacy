import { Engine } from 'eviate';
import { FileSystem } from '../src/fileSystem/fileSystemPlugin';
const app: Engine = new Engine();
const fileRouter = new FileSystem(
  {
    middlewareDir: '/examples/middle',
    routerDir: '/examples/routes',
    log: false
  },
  { title: 'base', description: 'base', version: '0.0.1' }
);

fileRouter.middlewares(app);
fileRouter.routes(app)
app.get('/', ctx => {
  return {
    status: 200,
    text: 'Hello World',
    headers: {
      //place holder i forgot the utf header and i dont wanna google
    }
  };
});

app.get('/:name', ctx => {
  return {
    status: 200,
    text: ctx.params.name,
    headers: {
      //place holder i forgot the utf header and i dont wanna google
    }
  };
});
app.listen({ port: 3000 });
