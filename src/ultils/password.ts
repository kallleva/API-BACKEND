import { compare, hash } from 'bcrypt';

export const createPassordHashed = async (password: string): Promise<string> => {
  const saltround = 10;
  return hash(password, saltround);
};

export const validatePassword = async (
  password: string,
  passwordhashed: string,
): Promise<boolean> => {
  return await compare(password, passwordhashed);
};
