import { PrismaClient } from '@prisma/client';
import { NotFoundException } from '@exceptions/not-found-exception';
import { BadRequestException } from '@exceptions/bad-request-exception';
import { ClienteInsertDTO } from './dtos/cliente-insert-dto';
import { ClientModel } from './cliente.model';
import { ClienteEditDTO } from './dtos/client-edit-dto';

const prisma = new PrismaClient();

// pega e busca todos os produtos
export const getClientes = async (): Promise<ClienteInsertDTO[]> => {
  const Clients = await prisma.cliente.findMany();

  if (Clients?.length === 0) {
    throw new NotFoundException('Clients');
  }

  return prisma.cliente.findMany();
};

// pega e busca o produto pelo ID
export const getClientById = async (cliente_id: number): Promise<ClientModel> => {
  const Client = await prisma.cliente.findFirst({
    where: {
      cliente_id,
    },
  });

  if (!Client) {
    throw new NotFoundException('Client');
  }
  return Client;
};

// faz a criação dos produtos , somente administradores
export const createClient = async (body: ClienteInsertDTO): Promise<ClientModel> => {
  const clientCPF = await getClientCPF(body.cliente_cpf).catch(() => undefined);

  if (clientCPF) {
    throw new BadRequestException(`User with Product ${body.cliente_cpf} already exists`);
  }

  const NewClient: ClienteInsertDTO = {
    ...body,
  };

  return prisma.cliente.create({
    data: NewClient,
  });
};

export const getClientCPF = async (cliente_cpf: string): Promise<ClientModel | null> => {
  const Client = await prisma.cliente.findFirst({
    where: {
      cliente_cpf,
    },
  });

  if (!Client) {
    throw new NotFoundException('Client');
  }
  return Client;
};

// faz a edição dos produtos
export const EditProduct = async (
  cliente_id: number,
  clienteEditDTO: ClienteEditDTO,
): Promise<ClientModel> => {
  const Client = await getClientById(cliente_id);

  const newClient = {
    ...Client,
    cliente_name: clienteEditDTO.cliente_name,
    cliente_email: clienteEditDTO.cliente_email,
    cliente_cpf: clienteEditDTO.cliente_cpf,
    cliente_phone: clienteEditDTO.cliente_phone,
  };

  return prisma.cliente.update({
    where: { cliente_id: cliente_id },
    data: newClient,
  });
};
