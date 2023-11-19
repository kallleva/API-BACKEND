import { PrismaClient } from '@prisma/client';
import { NotFoundException } from '@exceptions/not-found-exception';
import { ProductModel } from './product.model';
import { ProductIncertDTO } from './dtos/product-insert.tdo';
import { BadRequestException } from '@exceptions/bad-request-exception';
import { ProductEditDTO } from './dtos/product-edit.dto';

const prisma = new PrismaClient();

// pega e busca todos os produtos
export const getProducts = async (): Promise<ProductModel[]> => {
  const Product = await prisma.product.findMany();

  if (Product?.length === 0) {
    throw new NotFoundException('Products');
  }

  return prisma.product.findMany();
};

// pega e busca o produto pelo ID
export const getProductsById = async (product_id: number): Promise<ProductModel> => {
  const Product = await prisma.product.findFirst({
    where: {
      product_id,
    },
  });

  if (!Product) {
    throw new NotFoundException('Product');
  }
  return Product;
};

// faz a criação dos produtos , somente administradores
export const createProduct = async (body: ProductIncertDTO): Promise<ProductModel> => {
  const produtoNome = await getUserByNome(body.product_nome).catch(() => undefined);

  if (produtoNome) {
    throw new BadRequestException(`User with Product ${body.product_nome} already exists`);
  }

  const product: ProductIncertDTO = {
    ...body,
  };

  return prisma.product.create({
    data: product,
  });
};

export const getUserByNome = async (product_nome: string): Promise<ProductModel | null> => {
  const product = await prisma.product.findFirst({
    where: {
      product_nome,
    },
  });

  if (!product) {
    throw new NotFoundException('User');
  }
  return product;
};

// faz a edição dos produtos
export const EditProduct = async (
  product_id: number,
  productEditDTO: ProductEditDTO,
): Promise<ProductModel> => {
  const product = await getProductsById(product_id);

  const newProduct = {
    ...product,
    product_sub_id: productEditDTO.product_sub_id,
    product_nome: productEditDTO.product_nome,
    product_descrcao: productEditDTO.product_descricao,
    product_valor: productEditDTO.product_valor,
    product_imagem_id: productEditDTO.product_imagem_id,
    product_marca: productEditDTO.product_marca,
    product_descricao: productEditDTO.product_descrcao,
  };

  return prisma.product.update({
    where: { product_id: product_id },
    data: newProduct,
  });
};
