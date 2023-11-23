import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { ICreateUsersTokensDTO } from "@modules/accounts/dtos/ICreateUsersTokensDTO";
import { IUsersTokensRepository } from "../IUsersTokensRepository";


class UsersTokensRepositoryInMemory implements IUsersTokensRepository {

  private usersTokens: UserTokens[] = [];

  async create({ expires_date, refresh_token, user_id }: ICreateUsersTokensDTO): Promise<UserTokens> {
    const userToken = new UserTokens()
    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id
    })
    this.usersTokens.push(userToken)
    return userToken
  }

  async findByUserIdAndToken(user_id: string, token: string): Promise<UserTokens> {
    const userToken = this.usersTokens.find(user => {
      return user.id === user_id && user.refresh_token === token
    })
    return userToken
  }

  async deleteById(id: string): Promise<void> {
    const userToken = this.usersTokens.find(user => user.id === id)
    this.usersTokens.splice(this.usersTokens.indexOf(userToken))
  }

  async findByRefreshToken(token: string): Promise<UserTokens> {
    const userToken = this.usersTokens.find(user => {
      return user.refresh_token === token
    })
    return userToken
  }

}

export { UsersTokensRepositoryInMemory }