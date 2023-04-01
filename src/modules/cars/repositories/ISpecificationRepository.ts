import { Specifications } from '../models/Specifications';

interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationRepository {

    create({ name, description }: ICreateSpecificationDTO): void;

    findByName(name: string): Specifications;
    
}

export { ISpecificationRepository, ICreateSpecificationDTO }