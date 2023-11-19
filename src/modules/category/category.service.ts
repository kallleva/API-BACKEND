import { PrismaClient } from '@prisma/client';
import { NotFoundException } from '@exceptions/not-found-exception';
import { CategoryModel } from './category.models';
import { BadRequestException } from '@exceptions/bad-request-exception';
import { CategoryIncertDTO } from './dtos/category-insert-dto';
import { CategoryEditDTO } from './dtos/category-edit-dto';

const prisma = new PrismaClient();

// pega e busca todos os produtos
export const getcategory = async (): Promise<CategoryModel[]> => {
  const CategoryModel = await prisma.categoria.findMany();

  if (CategoryModel?.length === 0) {
    throw new NotFoundException('Categoria');
  }

  return prisma.categoria.findMany();
};

// // pega e busca o produto pelo ID
export const getCategoryById = async (categoria_id: number): Promise<CategoryModel> => {
  const CategoryModel = await prisma.categoria.findFirst({
    where: {
      categoria_id,
    },
  });

  if (!CategoryModel) {
    throw new NotFoundException('Categoria');
  }
  return CategoryModel;
};

// // faz a criação dos produtos , somente administradores
export const createCategory = async (body: CategoryIncertDTO): Promise<CategoryModel> => {
  const categorianome = await getCategoryByNome(body.categoria_nome).catch(() => undefined);

  if (categorianome) {
    throw new BadRequestException(`User with Product ${body.categoria_nome} already exists`);
  }

  const category: CategoryIncertDTO = {
    ...body,
  };

  return prisma.categoria.create({
    data: category,
  });
};

export const getCategoryByNome = async (categoria_nome: string): Promise<CategoryModel | null> => {
  const category = await prisma.categoria.findFirst({
    where: {
      categoria_nome,
    },
  });

  if (!category) {
    throw new NotFoundException('User');
  }
  return category;
};

// faz a edição dos produtos
export const EditCategory = async (
  categoria_id: number,
  categoryEditDTO: CategoryEditDTO,
): Promise<CategoryModel> => {
  const category = await getCategoryById(categoria_id);

  const newcategory = {
    ...category,
    categoria_nome: categoryEditDTO.categoria_nome,
  };

  return prisma.categoria.update({
    where: { categoria_id: categoria_id },
    data: newcategory,
  });
};
