import { AppException } from '@exceptions/app-exception';
import { Response } from 'express';

export class ReturnError {
  error: boolean;
  errorCode?: number;
  message: string;

  constructor(res: Response, error: Error, errorCode?: number) {
    this.error = true;
    this.message = error.message;
    this.errorCode = errorCode;

    if (error instanceof AppException) {
      this.errorCode = error.errorCode;
    }

    res.status(this.errorCode || 500).send(this);
  }
}
