import { User } from '../../../database/entities/User';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<User>;
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User>;
}

export { IUsersRepository };