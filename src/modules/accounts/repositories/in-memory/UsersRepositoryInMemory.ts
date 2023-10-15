import { ICreateUsersDTO } from '@modules/accounts/dtos/ICreateUsersDTO'
import { User } from '@modules/accounts/infra/typeorm/entities/User'
import { IUsersRepository } from '../IUsersRepository'

class UsersRepositoryInMemory implements IUsersRepository {

  private users: User[] = []

  async create(data: ICreateUsersDTO): Promise<void> {
    const user = new User()
    Object.assign(user, {
      ...data
    })
    this.users.push(user)
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find(user => user.email === email)
    return user
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find(user => user.id === id)
    return user
  }
}

export { UsersRepositoryInMemory }
