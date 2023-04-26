import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListUserUseCase } from './ListUserUseCase';
import { AppError } from '../../../../errors/AppError';

class ListUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const listUserUseCase = container.resolve(ListUserUseCase);
            const users = await listUserUseCase.execute();
            return response.status(200).json(users);
        } catch (error) {
            throw new AppError('Cannot list all users ' + error);
        }
    }
}

export { ListUserController };