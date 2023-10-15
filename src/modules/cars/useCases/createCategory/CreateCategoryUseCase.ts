import { inject, injectable } from 'tsyringe';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
    name: string;
    description: string;
}
@injectable()
class CreateCategoryUseCase {

    private categoriesRepository: ICategoriesRepository;

    constructor(
        @inject('CategoriesRepository')
        categoriesRepository: ICategoriesRepository
    ) {
        this.categoriesRepository = categoriesRepository;
    }

    async execute({ name, description }: IRequest): Promise<void> {
        const categoriesAlreadyExists = await this.categoriesRepository.findByName(name);
        if (categoriesAlreadyExists) {
            throw new AppError('Categories already exists');
        }
        this.categoriesRepository.create({ name, description });
    }

}

export { CreateCategoryUseCase };