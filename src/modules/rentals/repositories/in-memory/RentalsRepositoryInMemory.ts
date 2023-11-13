import { IRequest } from "@modules/rentals/dtos/ICreateRentalsDTO";
import { IRentalsRepository } from "../IRentalsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";


class RentalsRepositoryInMemory implements IRentalsRepository {

  private rentals: Rental[] = []

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find(rental => rental.car_id === car_id && !rental.end_date)
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(rental => rental.user_id === user_id && !rental.end_date)
  }

  async create({ car_id, user_id, expected_return_date }: IRequest): Promise<Rental> {
    const rental = new Rental()
    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date()
    })
    this.rentals.push(rental)
    return rental
  }

  async findByUserId(user_id: string): Promise<Rental[]> {
    return this.rentals.filter(rental => rental.user_id === user_id)
  }

  async findById(id: string): Promise<Rental> {
    return this.rentals.find(rental => rental.id === id)
  }
}

export { RentalsRepositoryInMemory }