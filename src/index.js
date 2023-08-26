import Express from 'express';
import { userRouter } from './models/user/user.controller.js';
import { productRouter } from './models/product/product.controller.js';
const app = Express();

app.use(userRouter);
app.use(productRouter);

app.listen(8080, function () {
  console.log('servidpr rodando');
});
