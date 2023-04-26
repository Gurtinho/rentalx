import { inject, injectable } from 'tsyringe';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { hashSync } from 'bcryptjs';
import { AppError } from '../../../../errors/AppError';

@injectable()
class CreateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}

    async execute({
        name,
        email,
        password,
        driver_licence
    }: ICreateUserDTO): Promise<void> {
        const userExists = await this.usersRepository.findByEmail(email);
        if (userExists) {
            throw new AppError('User Already Exists', 401);
        }
        const passwordHash = hashSync(password, 8);
        await this.usersRepository.create({
            name,
            email,
            password: passwordHash,
            driver_licence
        });
    }
}

export { CreateUserUseCase };