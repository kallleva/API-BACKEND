import { UserTypeEnum } from '@enums/user-type.enum';
import { ReturnError } from '@exceptions/Dto-exceptions/return-error.dto';
import { UnauthorizedException } from '@exceptions/unauthorization';
import { UserAuth } from '@modules/auth/dtos/user-auth.dto';
import { veryfyToken } from '@utils/auth';
import { NextFunction, Request, Response } from 'express';

export const authAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const autorizacao = req.headers.authorization;

  try {
    const user = (await veryfyToken(autorizacao)) as UserAuth;
    if (user.user_typeuser !== UserTypeEnum.ADMIN) {
      new ReturnError(res, new UnauthorizedException());
    } else {
      next();
    }
  } catch (error) {
    new ReturnError(res, error);
  }
};
