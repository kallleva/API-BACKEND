import Router, { Request, Response } from 'express';
import { getUsers, createUser, EditPassoword } from './user.service';
import { UserInsertDTO } from './dtos/users-inset.dto';
import { NotFoundException } from '@exceptions/not-found-exception';
import { ReturnError } from '@exceptions/Dto-exceptions/return-error.dto';
import { authAdminMiddleware } from 'src/middlewares/auth-admin.middleware';
import { authMiddleware } from 'src/middlewares/auth.middleaware';
import { UserEditPasswordDTO } from './dtos/user-edit-password.dto';
import { GetUserByToken } from '@utils/auth';
// import { authMiddleware } from 'src/middlewares/auth.middleaware';

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
    res.status(500).send('Erro ao buscar usuários');
  }
};

const editUserPassWord = async (
  req: Request<undefined, undefined, UserEditPasswordDTO>,
  res: Response,
): Promise<void> => {
  const userAuth = await GetUserByToken(req);
  try {
    const user = await EditPassoword(userAuth.user_id, req.body);
    res.send(user);
  } catch (error) {
    new ReturnError(res, error);
  }
};

const createUserController = async (
  req: Request<undefined, undefined, UserInsertDTO>,
  res: Response,
): Promise<void> => {
  try {
    const user = await createUser(req.body).catch((error) => {
      new ReturnError(res, error);
    });
    res.send(user);
  } catch (error) {
    res.status(500).send('Erro ao buscar usuários');
  }
};

// tipando os codigos
router.post('/', createUserController);
router.use(authMiddleware);
router.patch('/', editUserPassWord);
router.use(authAdminMiddleware); //authAdminMiddleware
router.get('/', getUserController);

export default userRouter;
