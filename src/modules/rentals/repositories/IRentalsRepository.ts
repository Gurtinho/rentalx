import { IRequest } from "../dtos/ICreateRentalsDTO";
import { Rental } from "../infra/typeorm/entities/Rental";

export interface IRentalsRepository {
  create({ car_id, user_id, expected_return_date }: IRequest): Promise<Rental> 
  findOpenRentalByCar(car_id: string): Promise<Rental>
  findOpenRentalByUser(user_id: string): Promise<Rental>
  findById(id: string): Promise<Rental>
  findByUserId(user_id: string): Promise<Rental[]>
}