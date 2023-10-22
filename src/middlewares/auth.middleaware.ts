import { ReturnError } from '@exceptions/Dto-exceptions/return-error.dto';
import { veryfyToken } from '@utils/auth';
import { NextFunction, Request, Response } from 'express';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const autorizacao = req.headers.authorization;

  try {
    await veryfyToken(autorizacao);
    next();
  } catch (error) {
    new ReturnError(res, error);
  }
};
