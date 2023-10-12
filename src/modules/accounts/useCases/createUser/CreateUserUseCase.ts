import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { ICreateUsersDTO } from '@modules/accounts/dtos/ICreateUsersDTO'
import { hash } from 'bcryptjs'

@injectable()
class CreateUserUseCase {
	private usersRepository: IUsersRepository
	constructor(
		@inject('UsersRepository')
		usersRepository: IUsersRepository,
	) {
		this.usersRepository = usersRepository
	}
	async execute({
		name,
		email,
		password,
		driver_licence,
	}: ICreateUsersDTO): Promise<void> {
		// const userAlreadyExists = await this.usersRepository.findByEmail(email)

		// if (userAlreadyExists) {
			// throw new Error('User already exists')
		// }

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
