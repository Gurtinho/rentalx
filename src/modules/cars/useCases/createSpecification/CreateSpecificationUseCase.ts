import { inject, injectable } from 'tsyringe';
import { ISpecificationRepository } from '../../repositories/ISpecificationRepository';
import { AppError } from '../../../../errors/AppError';

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    
    private specificationRepository: ISpecificationRepository
    constructor(
        @inject('SpecificationRepository')
        specificationRepository: ISpecificationRepository
    ) {
        this.specificationRepository = specificationRepository;
    }
    
    async execute({ name, description }: IRequest): Promise<void> {
        const specificationAlreadyExists = await this.specificationRepository.findByName(name);
        if (specificationAlreadyExists) {
            throw new AppError('Specification already exists', 401);
        }
        this.specificationRepository.create({
            name,
            description
        });
    }

}

export { CreateSpecificationUseCase };