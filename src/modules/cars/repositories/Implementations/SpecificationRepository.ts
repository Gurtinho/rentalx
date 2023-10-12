import { Repository } from 'typeorm';
import { dataConnection } from '@src/database/data-source';
import { Specification } from '@modules/cars/entities/Specification';
import { ISpecificationRepository, ICreateSpecificationDTO } from '@modules/cars/repositories/ISpecificationRepository';

class SpecificationRepository implements ISpecificationRepository {

    private repository: Repository<Specification>;
    
    constructor() {
        this.repository = dataConnection.getRepository(Specification);
    }

    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = this.repository.create({
            name,
            description
        });
        await this.repository.save(specification);
        return specification;
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOneBy({ name });
        return specification;
    }

}

export { SpecificationRepository };