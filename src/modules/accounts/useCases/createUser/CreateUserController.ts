import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, password, email, driver_licence } = request.body;
        try {
            const createUserUseCase = container.resolve(CreateUserUseCase);
            console.log(createUserUseCase);
            await createUserUseCase.execute({ name, password, email, driver_licence });

            return response.status(201).send();
        } catch (err) {
            throw new Error('Cannot create user');
        }
    }

}

export { CreateUserController };