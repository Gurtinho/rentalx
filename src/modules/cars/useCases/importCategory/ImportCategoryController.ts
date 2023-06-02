import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ImportCategoryUseCase } from '@modules/cars/useCases/importCategory/ImportCategoryUseCase';

class ImportCategoryController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { file } = request;
        try {
            const importCategoryUseCase = container.resolve(ImportCategoryUseCase);
            await importCategoryUseCase.execute(file);
            return response.status(201).json({ message: 'Import succefully' });
        } catch (err) {
            throw new Error('Cannot import category ');
        }
    }
    
}

export { ImportCategoryController };