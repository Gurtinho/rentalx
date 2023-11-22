import { inject, injectable } from "tsyringe";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { sign, verify } from "jsonwebtoken";
import auth from "@config/auth";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IPayloadDecode {
  sub: string
  email: string
}

@injectable()
class RefreshTokenUseCase {

  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<string> {
    const { sub: user_id, email } = verify(token, auth.secret_refresh_token) as IPayloadDecode
    const userToken = await this.usersTokensRepository.findByUserIdAndToken(user_id, token)
    if (!userToken) {
      throw new AppError('Refresh token does not exists')
    }
    await this.usersTokensRepository.deleteById(userToken.id)

    // criar novamente o token
    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user_id,
      expiresIn: auth.expires_in_refresh_token
    })

    const expires_date = this.dateProvider.addDays(
      auth.expired_in_refresh_token_days
    )

    await this.usersTokensRepository.create({
      expires_date,
      refresh_token,
      user_id
    })

    return refresh_token
  }
}

export { RefreshTokenUseCase }