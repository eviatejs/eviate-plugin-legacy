import { Engine } from 'eviate';

import { FileSystemRouter } from '../src/plugins/file-system-router';

const app: Engine = new Engine();
const fileRouter = new FileSystemRouter({
  middlewareDir: '/examples/middle',
  routerDir: '/examples/routes',
  log: false
});

fileRouter.middlewares(app);
fileRouter.routesLog(app);
app.get('/', _ => {
  return {
    status: 200,
    text: 'Hello World',
    headers: {
      // place holder i forgot the utf header and i dont wanna google
    }
  };
});

app.get('/:name', ctx => {
  return {
    status: 200,
    text: ctx.params.name,
    headers: {
      // place holder i forgot the utf header and i dont wanna google
    }
  };
});

app.listen();
