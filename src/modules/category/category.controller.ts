import { Request, Response, Router } from 'express';
import { NotFoundException } from '@exceptions/not-found-exception';
import { ReturnError } from '@exceptions/Dto-exceptions/return-error.dto';
// import { GetUserByToken } from '@utils/auth';
// import { UnauthorizedException } from '@exceptions/unauthorization';
//import { authAdminMiddleware } from 'src/middlewares/auth-admin.middleware';
import { createCategory, EditCategory, getcategory, getCategoryById } from './category.service';
import { CategoryIncertDTO } from './dtos/category-insert-dto';
import { UnauthorizedException } from '@exceptions/unauthorization';
import { GetUserByToken } from '@utils/auth';
import { CategoryEditDTO } from './dtos/category-edit-dto';

const categoryRouter = Router();
const router = Router();

categoryRouter.use('/categoria', router);

const getcategorycontroller = async (req: Request, res: Response): Promise<void> => {
  console.log(' esntrou dentro do getcategory');
  try {
    const categoryData = await getcategory().catch((error) => {
      if (error instanceof NotFoundException) {
        res.status(204);
      } else {
        new ReturnError(res, error);
      }
    });
    res.send(categoryData);
  } catch (error) {
    res.status(500).send('Erro ao buscar Categoria');
  }
};

const getCategoryByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const categoriaId: number = parseInt(req.params.categoria_id, 10); // Obtendo o ID da rota como número
    console.log(' productId  -->>' + categoriaId);
    const categoryData = await getCategoryById(categoriaId).catch((error) => {
      if (error instanceof NotFoundException) {
        res.status(204);
      } else {
        new ReturnError(res, error);
      }
    });
    res.send(categoryData);
  } catch (error) {
    res.status(500).send('Erro ao buscar Produto');
  }
};

// // acesso somente de ADMIN -------------------------------------------------
const createCategoryController = async (
  req: Request<undefined, undefined, CategoryIncertDTO>,
  res: Response,
): Promise<void> => {
  try {
    const user = await createCategory(req.body).catch((error) => {
      new ReturnError(res, error);
    });
    res.send(user);
  } catch (error) {
    res.status(500).send('Erro ao buscar usuários');
  }
};

const editcategory = async (
  req: Request<undefined, undefined, CategoryEditDTO>,
  res: Response,
): Promise<void> => {
  const userAuth = await GetUserByToken(req);
  const typeUser = userAuth.user_typeuser;
  const CategoryEditDTO = req.body;
  try {
    if (typeUser === 2) {
      const user = await EditCategory(CategoryEditDTO.categoria_id, CategoryEditDTO); // Correção: passe o product_id como primeiro argumento
      res.send(user);
    } else {
      throw new UnauthorizedException();
    }
  } catch (error) {
    new ReturnError(res, error);
  }
};

router.get('/', getcategorycontroller);
router.get('/:categoria_id', getCategoryByIdController);
// //router.use(authAdminMiddleware); //authAdminMiddleware
router.post('/', createCategoryController);
router.get('/', editcategory);

export default categoryRouter;
