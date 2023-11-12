import { dataConnection } from "@shared/infra/typeorm/data-source";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { Repository } from "typeorm";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IRequest } from "@modules/rentals/dtos/ICreateRentalsDTO";
import { injectable } from "tsyringe";

@injectable()
class RentalsRepository implements IRentalsRepository {

  private repository: Repository<Rental>

  constructor() {
    this.repository = dataConnection.getRepository(Rental)
  }

  async findById(id: string): Promise<Rental> {
    return await this.repository.findOneBy({ id })
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
    id, end_date,
    total
  }: IRequest): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
      id,
      end_date,
      total
    })
    this.repository.save(rental)
    return rental
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const car = await this.repository.findOne({
      where: {
        car_id,
        end_date: null
      }
    })
    return car
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const user = await this.repository.findOne({
      where: {
        user_id,
        end_date: null
      }
    })
    return user
  }

  async findByUserId(user_id: string): Promise<Rental[]> {
    const rental = await this.repository.find({
      where: {
        user_id
      },
      relations: [
        'car'
      ]
    })
    return rental
  }

}

export { RentalsRepository }