import { Repository } from 'typeorm'
import { User } from '@modules/accounts/entities/User'
import { ICreateUsersDTO } from '@modules/accounts/dtos/ICreateUsersDTO'
import { IUsersRepository } from '../IUsersRepository'
import { dataConnection } from '@src/database/data-source';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;
  
  constructor() {
    this.repository = dataConnection.getRepository(User);
  }

  async create(data: ICreateUsersDTO): Promise<void> {
    const user = this.repository.create({
      ...data
    });
    await this.repository.save(user);
  }
  
  
}

export { UsersRepository };