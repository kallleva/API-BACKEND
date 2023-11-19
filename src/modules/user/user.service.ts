import { PrismaClient } from '@prisma/client';
import { UserModel } from './user.model';
import { UserInsertDTO } from './dtos/users-inset.dto';
import { NotFoundException } from '@exceptions/not-found-exception';
import { BadRequestException } from '@exceptions/bad-request-exception';
import { createPassordHashed } from '@utils/password';
import { UserEditPasswordDTO } from './dtos/user-edit-password.dto';

const prisma = new PrismaClient();

export const getUsers = async (): Promise<UserModel[]> => {
  const users = await prisma.user.findMany();

  if (users?.length === 0) {
    throw new NotFoundException('User');
  }

  return prisma.user.findMany();
};

export const createUser = async (body: UserInsertDTO): Promise<UserModel> => {
  const userEmail = await getUserByEmail(body.user_email).catch(() => undefined);
  const usercpf = await getUserByCPF(body.user_cpf).catch(() => undefined);

  if (userEmail) {
    throw new BadRequestException(`User with email ${body.user_email} already exists`);
  }

  if (usercpf) {
    throw new BadRequestException(`User with CPF ${body.user_cpf} already exists`);
  }

  const user: UserInsertDTO = {
    ...body,
    user_password: await createPassordHashed(body.user_password),
  };

  return prisma.user.create({
    data: user,
  });
};

export const getUserByEmail = async (user_email: string): Promise<UserModel | null> => {
  const user = await prisma.user.findFirst({
    where: {
      user_email,
    },
  });

  if (!user) {
    throw new NotFoundException('User');
  }
  return user;
};

export const getUserByCPF = async (user_cpf: string): Promise<UserModel | null> => {
  const user = await prisma.user.findFirst({
    where: {
      user_cpf,
    },
  });

  if (!user) {
    throw new NotFoundException('User');
  }
  return user;
};

export const getUserById = async (user_id: number): Promise<UserModel> => {
  const user = await prisma.user.findFirst({
    where: {
      user_id,
    },
  });

  if (!user) {
    throw new NotFoundException('User');
  }
  return user;
};

export const EditPassoword = async (
  user_Id: number,
  userEditPasswordDTO: UserEditPasswordDTO,
): Promise<UserModel> => {
  const user = await getUserById(user_Id);

  const newUser = {
    ...user,
    user_password: await createPassordHashed(userEditPasswordDTO.user_password),
  };

  return prisma.user.update({
    where: { user_id: user_Id },
    data: newUser,
  });
};
