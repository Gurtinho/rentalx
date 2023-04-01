import { Request, Response } from 'express';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {
    
    private createCategoryUseCase: CreateCategoryUseCase
    constructor(createCategoryUseCase: CreateCategoryUseCase) { 
        this.createCategoryUseCase = createCategoryUseCase;
    }
    
    handle(request: Request, response: Response): Response {
        const { name, description } = request.body;
        try {
            this.createCategoryUseCase.execute({ name, description });
            return response.status(201).send();
        } catch (err) {
            return response.status(500).send(err);
        }
    }

    list(request: Request, response: Response): Response {
        try {
            return response.status(201).json();
        } catch (err) {
            return response.status(404).send(err);
        }
    }

}

export { CreateCategoryController }