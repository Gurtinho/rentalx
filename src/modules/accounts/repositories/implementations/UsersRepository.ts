import { Repository } from 'typeorm';
import { dataConnection } from '../../../../database/data-source';
import { User } from '../../../../database/entities/User';
import { IUsersRepository } from '../IUsersRepository';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = dataConnection.getRepository(User);
    }

    async create({
        name,
        email,
        password,
        driver_licence,
        avatar,
        id
    }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            email,
            password,
            driver_licence,
            avatar,
            id
        });
        await this.repository.save(user);
    }

    async findByEmail(email: string): Promise<User> {
        return await this.repository.findOneBy({ email });
    }

    async findAll(): Promise<User[]> {
        return await this.repository.find();
    }

    async findById(id: string): Promise<User> {
        return await this.repository.findOneBy({ id });
    }
}

export { UsersRepository };