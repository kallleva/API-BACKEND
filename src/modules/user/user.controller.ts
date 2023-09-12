import Router, { Request, Response } from 'express';
import { getUsers, createUser } from './user.service';
import * as core from 'express-serve-static-core';
import { promises } from 'fs';
import { UserInsertDTO } from './dtos/users-inset.dto';

const userRouter = Router();
const router = Router();

userRouter.use('/user', router);

console.log('chamou a router get');

userRouter.get('/user', async (_, res: Response): Promise<void> => {
  try {
    console.log('entrou aqui mo router get');

    const usersData = await getUsers();
    res.send(usersData);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).send('Erro ao buscar usuários');
  }
});

// tipando os codigos
userRouter.post('/user', async (req: Request<undefined, undefined , UserInsertDTO >, res: Response): Promise<void> => {
  try {
    console.log('entrou aqui mo router get');
    const user = await createUser(req.body);
    res.send(user);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).send('Erro ao buscar usuários');
  }
});

export default userRouter;
