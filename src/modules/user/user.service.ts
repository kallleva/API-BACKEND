import { PrismaClient } from '@prisma/client';
import { UserModel } from './user.model';
import { UserInsertDTO } from './dtos/users-inset.dto';

const prisma = new PrismaClient();

export const getUsers = async (): Promise<UserModel[]> => {
  return prisma.user.findMany();
};

export const createUser = async (body: UserInsertDTO): Promise<UserModel> => {
  const user = await prisma.user.create({
    data: body,
  });
  return user;
};
