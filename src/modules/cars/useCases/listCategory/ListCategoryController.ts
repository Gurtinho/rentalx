import { Request, Response } from 'express';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

class ListCategoryController {

    constructor(private categoriesRepository: ICategoriesRepository) { }

    handle(request: Request, response: Response): Response {
        const all = this.categoriesRepository.list();
        return response.status(201).json(all);
    }

}

export { ListCategoryController }