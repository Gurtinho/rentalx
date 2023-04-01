import { Request, Response } from 'express';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';

class ImportCategoryController {

    private importCategoryUseCase: ImportCategoryUseCase;
    constructor(importCategoryUseCase: ImportCategoryUseCase) {
        this.importCategoryUseCase = importCategoryUseCase;
    }

    async handle(request: Request, response: Response): Promise<Response> {
        const { file } = request;
        try {
            await this.importCategoryUseCase.execute(file);
            return response.status(201).json({ message: 'Importação realizada com sucesso.' });
        } catch (err) {
            return response.status(500).json({ message: err.message });
        }
    }
    
}

export { ImportCategoryController }