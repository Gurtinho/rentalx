import { ICreateUsersDTO } from '@modules/accounts/dtos/ICreateUsersDTO'
import { User } from '../entities/User'
import { IUsersRepository } from '../../../repositories/IUsersRepository'
import { Repository } from 'typeorm'
import { dataConnection } from '@shared/infra/typeorm/data-source'

class UsersRepository implements IUsersRepository {

  private repository: Repository<User>

  constructor() {
    this.repository = dataConnection.getRepository(User)
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOneBy({ email });
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOneBy({ id });
    return user;
  }

  async create({ id, name, email, password, driver_licence, avatar }: ICreateUsersDTO): Promise<void> {
    const user = this.repository.create({
      id, name, email, password, driver_licence, avatar
    });
    await this.repository.save(user);
  }
}

export { UsersRepository }
