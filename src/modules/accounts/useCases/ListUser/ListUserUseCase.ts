import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { User } from '../../../../database/entities/User';

@injectable()
class ListUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }
    
    async execute(): Promise<User[]> {
        const user = await this.usersRepository.findAll();
        return user;
    }
}

export { ListUserUseCase };