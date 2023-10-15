import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { AppError } from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string
}

export async function EnsureAuth(
	request: Request,
	response: Response,
	next: NextFunction,
) {
  const authHeader = request.headers.authorization
  if (!authHeader) {
    throw new AppError('token missing');
  }
  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, 'icecream') as IPayload;
    const usersRepository = new UsersRepository();
    const user = usersRepository.findById(user_id);
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
