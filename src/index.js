import Express from 'express';
import { routerLoader } from './routerLoader.js';

const app = Express();

routerLoader(app);

app.listen(8080, function () {
  console.log('servidpr rodando');
});

