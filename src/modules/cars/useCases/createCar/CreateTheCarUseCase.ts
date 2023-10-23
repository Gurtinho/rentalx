import'reflect-metadata'
import { inject, injectable } from 'tsyringe'
import { AppError } from '@shared/errors/AppError'
import { ICreateTheCarDTO } from '@modules/cars/dtos/ICreateTheCarDTO'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'

@injectable()
class CreateTheCarUseCase {

  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) { }
  
	async execute({
		name,
		description,
		daily_rate,
		licence_plate,
		fine_amount,
		brand,
		category_id,
  }: ICreateTheCarDTO): Promise<Car> {
    const carsAlreadyExists = await this.carsRepository.findByLicencePlate(licence_plate)
    if (carsAlreadyExists) {
      throw new AppError('Car already exists', 400)
    }
    if (!category_id) {
      throw new AppError('Category not found')
    }
    const car = await this.carsRepository.create({
      name,
      description,
      daily_rate,
      licence_plate,
      fine_amount,
      brand,
      category_id,
    })
    return car
  }
}

export { CreateTheCarUseCase }
