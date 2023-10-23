import { inject, injectable } from 'tsyringe'
import { ICarsRepository } from './../../repositories/ICarsRepository'
import { AppError } from '@shared/errors/AppError'
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'

interface IRequest {
	car_id: string
	specification_id: string[]
}

@injectable()
class CreateCarSpecificationUseCase {
	constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('SpecificationRepository')
    private specificationsRepository: ISpecificationRepository
	) {}

  async execute({ car_id, specification_id }: IRequest): Promise<Car> {
    const carsExists = await this.carsRepository.findById(car_id)
    if (!carsExists) {
      throw new AppError('Cars does not exists')
    }
    const specifications = await this.specificationsRepository.findById(specification_id)
    carsExists.specifications = specifications
    await this.carsRepository.create(carsExists)
    return carsExists
  }
}

export { CreateCarSpecificationUseCase }
