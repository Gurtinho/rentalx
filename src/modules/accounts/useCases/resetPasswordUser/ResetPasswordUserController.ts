import { Request, Response } from "express"
import { container } from "tsyringe";
import { resolve } from 'path';
import { ResetPasswordUserUseCase } from "./ResetPasswordUserUseCase";

class ResetPasswordUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query
    const { password } = request.body
    const resetPasswordUserUseCase = container.resolve(ResetPasswordUserUseCase)
    await resetPasswordUserUseCase.execute(String(token), password)
    return response.status(200).send()
  }
}

export { ResetPasswordUserController }