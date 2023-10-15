import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ImportCategoryUseCase } from '@modules/cars/useCases/importCategory/ImportCategoryUseCase';
import { AppError } from '@shared/errors/AppError';

class ImportCategoryController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { file } = request;
        try {
            const importCategoryUseCase = container.resolve(ImportCategoryUseCase);
            await importCategoryUseCase.execute(file);
            return response.status(201).json({ message: 'Import succefully' });
        } catch (err) {
            throw new AppError('Cannot import category ');
        }
    }
    
}

export { ImportCategoryController };