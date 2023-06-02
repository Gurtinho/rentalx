import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListCategoryUseCase } from '@modules/cars/useCases/listCategory/ListCategoryUseCase';

class ListCategoryController {

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const listCategoryUseCase = container.resolve(ListCategoryUseCase);
            const all = await listCategoryUseCase.execute();
            return response.status(201).json(all);
        } catch (err) {
            return response.status(404).json(err);
        }
    }

}

export { ListCategoryController };