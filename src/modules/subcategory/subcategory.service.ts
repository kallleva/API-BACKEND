import { PrismaClient } from '@prisma/client';
import { NotFoundException } from '@exceptions/not-found-exception';
import { BadRequestException } from '@exceptions/bad-request-exception';
import { SubCategoryModel } from './subcategory.models';
import { SubCategoryIncertDTO } from './dtos/subCategory-dto';
import { SubCategoryEditDTO } from './dtos/subcategory-edit-dto';

const prisma = new PrismaClient();

// pega e busca todos os produtos
export const getsubcategory = async (): Promise<SubCategoryModel[]> => {
  const SubCategoryModel = await prisma.sub_categoria.findMany();

  if (SubCategoryModel?.length === 0) {
    throw new NotFoundException('Sub Categoria');
  }

  return prisma.sub_categoria.findMany();
};

// // pega e busca o produto pelo ID
export const getsubCategoryById = async (sub_categoria_id: number): Promise<SubCategoryModel> => {
  const SubCategoryModel = await prisma.sub_categoria.findFirst({
    where: {
      sub_categoria_id,
    },
  });

  if (!SubCategoryModel) {
    throw new NotFoundException('Sub Categoria');
  }
  return SubCategoryModel;
};

// // faz a criação dos produtos , somente administradores
export const createSubCategory = async (body: SubCategoryIncertDTO): Promise<SubCategoryModel> => {
  const subCategoryNome = await getSubCategoryByNome(body.sub_categoria_nome).catch(
    () => undefined,
  );

  if (subCategoryNome) {
    throw new BadRequestException(`User with Product ${body.sub_categoria_nome} already exists`);
  }

  const Subcategory: SubCategoryIncertDTO = {
    ...body,
  };

  return prisma.sub_categoria.create({
    data: Subcategory,
  });
};

export const getSubCategoryByNome = async (
  sub_categoria_nome: string,
): Promise<SubCategoryModel | null> => {
  const subcategory = await prisma.sub_categoria.findFirst({
    where: {
      sub_categoria_nome,
    },
  });

  if (!subcategory) {
    throw new NotFoundException('User');
  }
  return subcategory;
};

// faz a edição dos produtos
export const EditSubCategory = async (
  sub_categoria_id: number,
  subCategoryEditDTO: SubCategoryEditDTO,
): Promise<SubCategoryModel> => {
  const subcategory = await getsubCategoryById(sub_categoria_id);

  const newsubcategory = {
    ...subcategory,
    categoria_id: subCategoryEditDTO.categoria_id,
    sub_categoria_nome: subCategoryEditDTO.sub_categoria_nome,
  };

  return prisma.sub_categoria.update({
    where: { sub_categoria_id: sub_categoria_id },
    data: newsubcategory,
  });
};
