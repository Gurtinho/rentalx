import { Specification } from '@modules/cars/entities/Specification';

interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationRepository {

    create({ name, description }: ICreateSpecificationDTO): Promise<Specification>;

    findByName(name: string): Promise<Specification>;
    
}

export { ISpecificationRepository, ICreateSpecificationDTO };