import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateSpecificationUseCase } from '@modules/cars/useCases/createSpecification/CreateSpecificationUseCase';
import { AppError } from '@shared/errors/AppError';

class CreateSpecificationController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;
        try {
            const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase);
            await createSpecificationUseCase.execute({ name, description });
            return response.status(201).send();
        } catch (err) {
            throw new AppError('Cannot create specification ');
        }
    }

}

export { CreateSpecificationController };