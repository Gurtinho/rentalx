import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import { AppError } from '@shared/errors/AppError'
import { Request, Response, NextFunction } from 'express'

export async function EnsureAdmin(
	request: Request,
	response: Response,
	next: NextFunction,
) {
  const { id } = request.user
  const userRepository = new UsersRepository()
  const user = await userRepository.findById(id)

  if (!user.is_admin) {
    throw new AppError('User is not admin')
  }

  return next()
}
