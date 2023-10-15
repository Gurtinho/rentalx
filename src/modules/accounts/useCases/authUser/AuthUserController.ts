import { Request, Response } from 'express';
import { AuthUserUseCase } from './AuthUserUseCase';
import { container } from 'tsyringe';

class AuthUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body
    const authUserUseCase = container.resolve(AuthUserUseCase)
    const token = await authUserUseCase.execute({ email, password });
    return response.status(201).send(token);
  }
}

export { AuthUserController }