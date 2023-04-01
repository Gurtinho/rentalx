import { Request, Response } from 'express';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

class CreateSpecificationController {

    private createSpecificationUseCase: CreateSpecificationUseCase;
    constructor(createSpecificationUseCase: CreateSpecificationUseCase) {
        this.createSpecificationUseCase = createSpecificationUseCase;
    }

    handle(request: Request, response: Response): Response {
        const { name, description } = request.body;
        try {
            this.createSpecificationUseCase.execute({ name, description });
            return response.status(201).send();
        } catch (err) {
            return response.status(500).send(err);
        }
    }

}

export { CreateSpecificationController }