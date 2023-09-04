import Router from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const userRouter = Router();
const router = Router();

userRouter.use('/user', router);

// router.get('/', function (req, res) {

// router.get('/', async function (req, res) {
//   const prisma = new PrismaClient();
//   const user = await prisma.user.findMany;

//   res.send(user);
// });
console.log('chamou a router get');

userRouter.get('/user', async (req, res) => {
  try {
    console.log('entrou aqui mo router get');
    const users = await prisma.user.findMany();

    // Certifique-se de que users seja um array de objetos
    const usersData = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        // Adicione outros campos que desejar aqui
      };
    });

    res.send(usersData);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).send('Erro ao buscar usuários');
  }
});

export default userRouter;
