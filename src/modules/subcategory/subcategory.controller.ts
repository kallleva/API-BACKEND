import { Request, Response, Router } from 'express';
import { NotFoundException } from '@exceptions/not-found-exception';
import { ReturnError } from '@exceptions/Dto-exceptions/return-error.dto';
import {
  createSubCategory,
  EditSubCategory,
  getsubcategory,
  getsubCategoryById,
} from './subcategory.service';
import { SubCategoryIncertDTO } from './dtos/subCategory-dto';
import { UnauthorizedException } from '@exceptions/unauthorization';
import { GetUserByToken } from '@utils/auth';
import { SubCategoryEditDTO } from './dtos/subcategory-edit-dto';

const subcategoryRouter = Router();
const router = Router();

subcategoryRouter.use('/subcategoria', router);

const getsubcategorycontroller = async (req: Request, res: Response): Promise<void> => {
  console.log(' esntrou dentro do getsubcategorycontroller');
  try {
    const subcategoryData = await getsubcategory().catch((error) => {
      if (error instanceof NotFoundException) {
        res.status(204);
      } else {
        new ReturnError(res, error);
      }
    });
    res.send(subcategoryData);
  } catch (error) {
    res.status(500).send('Erro ao buscar Categoria');
  }
};

const getSubCategoryByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const sub_categoriaId: number = parseInt(req.params.sub_categoria_id, 10); // Obtendo o ID da rota como número
    console.log(' sub_categoriaId  -->>' + sub_categoriaId);
    const subcategoryData = await getsubCategoryById(sub_categoriaId).catch((error) => {
      if (error instanceof NotFoundException) {
        res.status(204);
      } else {
        new ReturnError(res, error);
      }
    });
    res.send(subcategoryData);
  } catch (error) {
    res.status(500).send('Erro ao buscar a Sub Categoria');
  }
};

// acesso somente de ADMIN -------------------------------------------------
const createSubController = async (
  req: Request<undefined, undefined, SubCategoryIncertDTO>,
  res: Response,
): Promise<void> => {
  try {
    const SubCategory = await createSubCategory(req.body).catch((error) => {
      new ReturnError(res, error);
    });
    res.send(SubCategory);
  } catch (error) {
    res.status(500).send('Erro ao buscar usuários');
  }
};

const editSubCategory = async (
  req: Request<undefined, undefined, SubCategoryEditDTO>,
  res: Response,
): Promise<void> => {
  const userAuth = await GetUserByToken(req);
  const typeUser = userAuth.user_typeuser;
  const SubCategoryEditDTO = req.body;
  try {
    if (typeUser === 2) {
      const user = await EditSubCategory(SubCategoryEditDTO.sub_categoria_id, SubCategoryEditDTO); // Correção: passe o product_id como primeiro argumento
      res.send(user);
    } else {
      throw new UnauthorizedException();
    }
  } catch (error) {
    new ReturnError(res, error);
  }
};

router.get('/', getsubcategorycontroller);
router.get('/:sub_categoria_id', getSubCategoryByIdController);
router.post('/', createSubController);
router.put('/', editSubCategory); // Alterei de router.get para router.put se for uma operação de edição

export default subcategoryRouter;
