import 'reflect-metadata'
import { IRequest } from "@modules/rentals/dtos/ICreateRentalsDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { inject, injectable } from "tsyringe";
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

@injectable()
class CreateRentalUseCase {

  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({ car_id, user_id, expected_return_date }: IRequest): Promise<Rental> {
    const minumunHour = 24
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id)
    if (carUnavailable) {
      throw new AppError('This car is not available')
    }
    const userAlreadyHasACar = await this.rentalsRepository.findOpenRentalByUser(user_id)
    if (userAlreadyHasACar) {
      throw new AppError('There is already in progress by user')
    }
    const dateNow = this.dateProvider.dayNow()
    const compare = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date,
    )
    if (compare < minumunHour) {
      throw new AppError('Invalid return time!')
    }
    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date
    })

    await this.carsRepository.updateAvailable(car_id, false)

    return rental
  }
}

export { CreateRentalUseCase }