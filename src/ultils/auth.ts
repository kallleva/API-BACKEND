import { UnauthorizedException } from '@exceptions/unauthorization';
import { UserAuth } from '@modules/auth/dtos/user-auth.dto';
import { UserModel } from '@modules/user/user.model';
import { Request } from 'express';
import { sign, verify } from 'jsonwebtoken';

const PASSWORD_JWT = 'umasenhatrocar';

export const generateToken = async (user: UserModel): Promise<string> => {
  return sign(
    {
      user_id: user.user_id,
      user_email: user.user_email,
      user_typeuser: user.user_typeuser,
    } as UserAuth, // Certifique-se de que as chaves correspondam a UserAuth
    PASSWORD_JWT,
    {
      subject: String(user.user_id),
      expiresIn: '604800000',
    },
  );
};

export const veryfyToken = async (authorization?: string): Promise<UserAuth> => {
  if (!authorization) {
    throw new UnauthorizedException();
  }
  const [, token] = authorization.split(' ');

  try {
    const decodedToken = verify(token, PASSWORD_JWT) as UserAuth;
    console.log('dentro do decodedtoken', decodedToken);
    return decodedToken;
  } catch {
    throw new UnauthorizedException();
  }
};

export const GetUserByToken = async (req: Request): Promise<UserAuth> => {
  const autorizacao = req.headers.authorization;
  return veryfyToken(autorizacao);
};
