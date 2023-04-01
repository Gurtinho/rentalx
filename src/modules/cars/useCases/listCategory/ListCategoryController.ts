import { Request, Response } from 'express';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { ListCategoryUseCase } from './ListCategoryUseCase';

class ListCategoryController {

    private listCategoryUseCase: ListCategoryUseCase
    constructor(listCategoryUseCase: ListCategoryUseCase) {
        this.listCategoryUseCase = listCategoryUseCase;
    }

    handle(request: Request, response: Response): Response {
        try {
            const all = this.listCategoryUseCase.execute();
            return response.status(201).json(all);
        } catch (err) {
            return response.status(404).json(err);
        }
    }

}

export { ListCategoryController }