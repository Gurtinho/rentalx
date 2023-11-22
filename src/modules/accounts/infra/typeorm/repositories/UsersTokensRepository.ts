import { ICreateUsersTokensDTO } from '@modules/accounts/dtos/ICreateUsersTokensDTO';
import { IUsersTokensRepository } from '../../../repositories/IUsersTokensRepository';
import { dataConnection } from '@shared/infra/typeorm/data-source';
import { UserTokens } from '../entities/UserTokens';
import { Repository } from 'typeorm';

class UsersTokensRepository implements IUsersTokensRepository {

  private repository: Repository<UserTokens>

  constructor() {
    this.repository = dataConnection.getRepository(UserTokens)
  }

  async create({ expires_date, refresh_token, user_id }: ICreateUsersTokensDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      refresh_token,
      user_id,
      expires_date
    })
    await this.repository.save(userToken)
    return userToken
  }

  async findByUserIdAndToken(user_id: string, token: string): Promise<UserTokens> {
    return this.repository.findOneBy({ user_id })
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id)
  }

}

export { UsersTokensRepository }