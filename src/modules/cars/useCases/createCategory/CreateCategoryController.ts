import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCategoryUseCase } from '@modules/cars/useCases/createCategory/CreateCategoryUseCase';

class CreateCategoryController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;
        try {
            const createCategoryUseCase = container.resolve(CreateCategoryUseCase);
            await createCategoryUseCase.execute({ name, description });
            return response.status(201).send();
        } catch (err) {
            throw new Error('Cannot create category ');
        }
    }

}

export { CreateCategoryController };