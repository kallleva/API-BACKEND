import { Request, Response, Router } from 'express';
import { EditProduct, createProduct, getProducts, getProductsById } from './prosuct.service';
import { NotFoundException } from '@exceptions/not-found-exception';
import { ReturnError } from '@exceptions/Dto-exceptions/return-error.dto';
import { ProductIncertDTO } from './dtos/product-insert.tdo';
import { GetUserByToken } from '@utils/auth';
import { ProductEditDTO } from './dtos/product-edit.dto';
import { UnauthorizedException } from '@exceptions/unauthorization';
//import { authAdminMiddleware } from 'src/middlewares/auth-admin.middleware';

const productRouter = Router();
const router = Router();

productRouter.use('/product', router);

const getProduct = async (req: Request, res: Response): Promise<void> => {
  console.log(' esntrou dentro do getproduct');
  try {
    const productData = await getProducts().catch((error) => {
      if (error instanceof NotFoundException) {
        res.status(204);
      } else {
        new ReturnError(res, error);
      }
    });
    res.send(productData);
  } catch (error) {
    res.status(500).send('Erro ao buscar usuários');
  }
};

const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId: number = parseInt(req.params.product_id, 10); // Obtendo o ID da rota como número
    console.log(' productId  -->>' + productId);
    const productData = await getProductsById(productId).catch((error) => {
      if (error instanceof NotFoundException) {
        res.status(204);
      } else {
        new ReturnError(res, error);
      }
    });
    res.send(productData);
  } catch (error) {
    res.status(500).send('Erro ao buscar Produto');
  }
};

// acesso somente de ADMIN -------------------------------------------------
const createProductController = async (
  req: Request<undefined, undefined, ProductIncertDTO>,
  res: Response,
): Promise<void> => {
  try {
    const Product = await createProduct(req.body).catch((error) => {
      new ReturnError(res, error);
    });
    res.send(Product);
  } catch (error) {
    res.status(500).send('Erro ao buscar usuários');
  }
};

// controller de edição do password
const editProduct = async (
  req: Request<undefined, undefined, ProductEditDTO>,
  res: Response,
): Promise<void> => {
  const userAuth = await GetUserByToken(req);
  const typeUser = userAuth.user_typeuser;
  const productEditDTO = req.body;
  try {
    if (typeUser === 2) {
      const user = await EditProduct(productEditDTO.product_id, productEditDTO); // Correção: passe o product_id como primeiro argumento
      res.send(user);
    } else {
      throw new UnauthorizedException();
    }
  } catch (error) {
    new ReturnError(res, error);
  }
};

router.get('/', getProduct);
router.get('/:product_id', getProductById);
//router.use(authAdminMiddleware); //authAdminMiddleware
router.post('/', createProductController);
router.get('/', editProduct);

export default productRouter;
