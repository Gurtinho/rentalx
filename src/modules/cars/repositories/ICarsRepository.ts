import { ICreateTheCarDTO } from '@modules/cars/dtos/ICreateTheCarDTO'
import { Car } from '../infra/typeorm/entities/Car'

export interface ICarsRepository {
  create(data: ICreateTheCarDTO): Promise<Car>
  findByLicencePlate(licence_plate: string): Promise<Car>
  findAvailable(name?: string, category_id?: string, brand?: string): Promise<Car[]>
  findById(car_id: string): Promise<Car>
}