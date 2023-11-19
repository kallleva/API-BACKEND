import { Request, Response, Router } from 'express';
import { NotFoundException } from '@exceptions/not-found-exception';
import { ReturnError } from '@exceptions/Dto-exceptions/return-error.dto';
import { EditProduct, createClient, getClientById, getClientes } from './cliente.service';
import { ClienteInsertDTO } from './dtos/cliente-insert-dto';
import { ClienteEditDTO } from './dtos/client-edit-dto';
import { GetUserByToken } from '@utils/auth';
import { UnauthorizedException } from '@exceptions/unauthorization';
//import { authAdminMiddleware } from 'src/middlewares/auth-admin.middleware';

const clienteRouter = Router();
const router = Router();

clienteRouter.use('/cliente', router);

const getClientecontroller = async (req: Request, res: Response): Promise<void> => {
  console.log(' esntrou dentro do getproduct');
  try {
    const ClienteData = await getClientes().catch((error) => {
      if (error instanceof NotFoundException) {
        res.status(204);
      } else {
        new ReturnError(res, error);
      }
    });
    res.send(ClienteData);
  } catch (error) {
    res.status(500).send('Erro ao buscar usuários');
  }
};

const getClienteByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const clienteid: number = parseInt(req.params.cliente_id, 10); // Obtendo o ID da rota como número
    console.log(' productId  -->>' + clienteid);
    const ClienteData = await getClientById(clienteid).catch((error) => {
      if (error instanceof NotFoundException) {
        res.status(204);
      } else {
        new ReturnError(res, error);
      }
    });
    res.send(ClienteData);
  } catch (error) {
    res.status(500).send('Erro ao buscar Produto');
  }
};

// // acesso somente de ADMIN -------------------------------------------------
const createClientController = async (
  req: Request<undefined, undefined, ClienteInsertDTO>,
  res: Response,
): Promise<void> => {
  try {
    const Product = await createClient(req.body).catch((error) => {
      new ReturnError(res, error);
    });
    res.send(Product);
  } catch (error) {
    res.status(500).send('Erro ao buscar usuários');
  }
};

// // controller de edição do password
const editClient = async (
  req: Request<undefined, undefined, ClienteEditDTO>,
  res: Response,
): Promise<void> => {
  const userAuth = await GetUserByToken(req);
  const typeUser = userAuth.user_typeuser;
  const ClienteEditDTO = req.body;
  try {
    if (typeUser === 2) {
      const user = await EditProduct(ClienteEditDTO.cliente_id, ClienteEditDTO); // Correção: passe o product_id como primeiro argumento
      res.send(user);
    } else {
      throw new UnauthorizedException();
    }
  } catch (error) {
    new ReturnError(res, error);
  }
};

router.get('/', getClientecontroller);
router.get('/:cliente_id', getClienteByIdController);
router.post('/', createClientController);

//router.use(authAdminMiddleware); //authAdminMiddleware
router.get('/', editClient);

export default clienteRouter;
