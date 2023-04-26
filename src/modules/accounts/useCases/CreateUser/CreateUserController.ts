import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from './CreateUserUseCase';
import { AppError } from '../../../../errors/AppError';

class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const data_user = request.body;
            const createUserUseCase = container.resolve(CreateUserUseCase);
            await createUserUseCase.execute(data_user);
            return response.status(201).json({message: 'Create User Succefully'});
        } catch (error) {
            throw new AppError('Cannot create user: ' + error);
        }
    }
}

export { CreateUserController };