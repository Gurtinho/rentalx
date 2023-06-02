import { Specifications } from '@src/database/entities/Specifications';

interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationRepository {

    create({ name, description }: ICreateSpecificationDTO): Promise<Specifications>;

    findByName(name: string): Promise<Specifications>;
    
}

export { ISpecificationRepository, ICreateSpecificationDTO };