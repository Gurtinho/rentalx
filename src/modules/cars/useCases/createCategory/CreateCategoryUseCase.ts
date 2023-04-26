import { inject, injectable } from 'tsyringe';
import { CategoriesRepository } from '../../repositories/Implementations/CategoriesRepository';
import { AppError } from '../../../../errors/AppError';

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {

    private categoriesRepository: CategoriesRepository;
    constructor(
        @inject('CategoriesRepository')
        categoriesRepository: CategoriesRepository
    ) {
        this.categoriesRepository = categoriesRepository;
    }

    async execute({ name, description }: IRequest): Promise<void> {
        const categoriesAlreadyExists = await this.categoriesRepository.findByName(name);
        if (categoriesAlreadyExists) {
            throw new AppError('Categories already exists', 401);
        }
        this.categoriesRepository.create({ name, description });
    }

}

export { CreateCategoryUseCase };