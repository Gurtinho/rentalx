import { inject, injectable } from 'tsyringe'
import { ICreateUsersDTO } from '../../dtos/ICreateUsersDTO'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { hash } from 'bcryptjs'
import { AppError } from '@shared/errors/AppError'

@injectable()
class CreateUserUseCase {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
	) {}

	async execute({
		name,
		email,
		password,
		driver_licence,
  }: ICreateUsersDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)
    if (userAlreadyExists) { 
      throw new AppError('ja existe parça');
    } 
		const passwordHash = await hash(password, 8)
		await this.usersRepository.create({
			name,
			email,
			password: passwordHash,
			driver_licence,
		})
	}
}

export { CreateUserUseCase }
