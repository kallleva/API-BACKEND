import Router, { Request, Response } from 'express';
import { AuthDto } from './dtos/auth.dto';
import { validateAuth } from './auth.service';
import { ReturnError } from '@exceptions/Dto-exceptions/return-error.dto';

const authRouter = Router();
const router = Router();

const auth = async (req: Request<undefined, undefined, AuthDto>, res: Response): Promise<void> => {
  try {
    const user = await validateAuth(req.body);
    res.send(user);
  } catch (error) {
    new ReturnError(res, error);
  }
};

authRouter.use('/auth', router);
router.post('/', auth);

export default authRouter;
