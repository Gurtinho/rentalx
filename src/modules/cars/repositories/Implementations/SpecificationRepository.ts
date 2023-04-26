import { Repository } from 'typeorm';
import { dataConnection } from '../../../../database/data-source';
import { Specifications } from '../../../../database/entities/Specifications';
import { ISpecificationRepository, ICreateSpecificationDTO } from '../ISpecificationRepository';

class SpecificationRepository implements ISpecificationRepository {

    private repository: Repository<Specifications>;
    
    constructor() {
        this.repository = dataConnection.getRepository(Specifications);
    }

    async create({ name, description }: ICreateSpecificationDTO): Promise<Specifications> {
        const specification = this.repository.create({
            name,
            description
        });
        await this.repository.save(specification);
        return specification;
    }

    async findByName(name: string): Promise<Specifications> {
        const specification = await this.repository.findOneBy({ name });
        return specification;
    }

}

export { SpecificationRepository };