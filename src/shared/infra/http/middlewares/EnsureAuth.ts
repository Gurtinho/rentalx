import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { AppError } from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import auth from '@config/auth';

interface IPayload {
  sub: string
}

export async function EnsureAuth(
	request: Request,
	response: Response,
	next: NextFunction,
) {
  const authHeader = request.headers.authorization
  const usersTokensRepository = new UsersTokensRepository()
  if (!authHeader) {
    throw new AppError('token missing');
  }
  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, auth.secret_refresh_token) as IPayload;

    const user = usersTokensRepository.findByUserIdAndToken(user_id, token);

    if (!user) {
      throw new AppError('user not exists');
    }

    request.user = {
      id: user_id
    }

    next();
  } catch (err) {
    throw new AppError('invalid token');
  }
}
