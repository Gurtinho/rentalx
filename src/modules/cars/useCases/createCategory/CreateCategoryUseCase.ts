import { CategoriesRepository } from '../../repositories/Implementations/CategoriesRepository';

interface IRequest {
    name: string,
    description: string
}

class CreateCategoryUseCase {

    private categoriesRepository: CategoriesRepository
    constructor(categoriesRepository: CategoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }

    execute({ name, description }: IRequest): void {
        const categoriesAlreadyExists = this.categoriesRepository.findByName(name);
        if (categoriesAlreadyExists) {
            throw new Error('Categories already exists');
        }
        this.categoriesRepository.create({ name, description });
    }

}

export { CreateCategoryUseCase }