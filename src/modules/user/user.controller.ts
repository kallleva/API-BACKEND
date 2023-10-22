import Router, { Request, Response } from 'express';
import { getUsers, createUser } from './user.service';
import { UserInsertDTO } from './dtos/users-inset.dto';
import { NotFoundException } from '@exceptions/not-found-exception';
import { ReturnError } from '@exceptions/Dto-exceptions/return-error.dto';
import { authAdminMiddleware } from 'src/middlewares/auth-admin.middleware';

const userRouter = Router();
const router = Router();

userRouter.use('/user', router);

const getUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const usersData = await getUsers().catch((error) => {
      if (error instanceof NotFoundException) {
        res.status(204);
      } else {
        new ReturnError(res, error);
      }
    });
    res.send(usersData);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).send('Erro ao buscar usuários');
  }
};

const createUserController = async (
  req: Request<undefined, undefined, UserInsertDTO>,
  res: Response,
): Promise<void> => {
  try {
    console.log('entrou aqui mo router get');
    const user = await createUser(req.body).catch((error) => {
      new ReturnError(res, error);
    });
    res.send(user);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).send('Erro ao buscar usuários');
  }
};

// tipando os codigos
router.post('/', createUserController);

//router.use(authMiddleware);
router.use(authAdminMiddleware); //authAdminMiddleware
router.get('/', getUserController);

export default userRouter;
