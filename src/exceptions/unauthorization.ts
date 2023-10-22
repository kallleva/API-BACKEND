import { AppException } from './app-exception';

export class UnauthorizedException extends AppException {
  constructor() {
    super('401 usuario nao autorizado', 401);
  }
}
