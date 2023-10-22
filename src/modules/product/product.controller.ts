import { Request, Response, Router } from 'express';

const productRouter = Router();
const router = Router();

productRouter.use('/product', router);

const getProduct = (req: Request, res: Response): void => {
  res.send(' entrou produto ');
};
router.get('/', getProduct);

export default productRouter;
