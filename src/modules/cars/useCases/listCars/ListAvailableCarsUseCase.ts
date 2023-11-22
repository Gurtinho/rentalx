import'reflect-metadata'
import { inject, injectable } from 'tsyringe'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'

interface IRequest {
  category_id?: string
  brand?: string
  name?: string
}

@injectable()
class ListAvailableCarsUseCase {

  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) { }
  
  async execute({ brand, category_id, name }: IRequest): Promise<Car[]> {
    const cars = this.carsRepository.findAvailable(name, brand, category_id)
    return cars
  }
}

export { ListAvailableCarsUseCase }
