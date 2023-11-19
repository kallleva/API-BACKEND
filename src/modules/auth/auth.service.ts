import { AuthDto } from './dtos/auth.dto';
import { getUserByEmail } from '@modules/user/user.service';
import { validatePassword } from '@utils/password';
import { NotFoundException } from '@exceptions/not-found-exception';
import { AuthModel } from './auth.model';
import { generateToken } from '@utils/auth';

export const validateAuth = async (authDto: AuthDto): Promise<AuthModel> => {
  const user = await getUserByEmail(authDto.user_email);

  const isvalidPassword = await validatePassword(authDto.user_password, user.user_password);
  console.log('dentro do auth controller -->> ' + isvalidPassword);
  console.log(
    'dentro do auth controller authDto.user_password -->> ' +
      authDto.user_password +
      '  user.user_password -->>> ' +
      user.user_password,
  );
  if (!isvalidPassword) {
    throw new NotFoundException('User');
  }

  return new AuthModel(await generateToken(user), user);
};
