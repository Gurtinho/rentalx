import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthUserUseCase } from './AuthUserUseCase';
import { AppError } from '../../../../errors/AppError';

class AuthUserController {
    async handle(request: Request, response: Response) {
        try {
            const { email, password } = request.body;
            const authUserUseCase = container.resolve(AuthUserUseCase);
            const token = await authUserUseCase.execute({ email, password });
            return response.status(200).json(token);
        } catch (error) {
            throw new AppError('Internal error: ' + error, 401);
        }
    }
}

export { AuthUserController };