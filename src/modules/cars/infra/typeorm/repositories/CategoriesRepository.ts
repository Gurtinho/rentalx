import { Repository } from 'typeorm';
import { dataConnection } from '@shared/infra/typeorm/data-source';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { ICategoriesRepository, ICreateCategoryDTO } from '@modules/cars/repositories/ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {

    private repository: Repository<Category>;

    constructor() {
        this.repository = dataConnection.getRepository(Category);
    }

    async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
        const category = this.repository.create({
            name,
            description
        });
        await this.repository.save(category);
        return category;
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    }

    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOneBy({ name });
        return category;
    }
}

export { CategoriesRepository };