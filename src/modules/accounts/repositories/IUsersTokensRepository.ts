import { ICreateUsersTokensDTO } from '../dtos/ICreateUsersTokensDTO'
import { UserTokens } from '../infra/typeorm/entities/UserTokens'

export interface IUsersTokensRepository {
	create({ expires_date, refresh_token, user_id }: ICreateUsersTokensDTO): Promise<UserTokens>
	findByUserIdAndToken(user_id: string, token: string): Promise<UserTokens>
	deleteById(id: string): Promise<void>
	findByRefreshToken(token: string): Promise<UserTokens>
}