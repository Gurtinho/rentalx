import { ICreateTheCarDTO } from '@modules/cars/dtos/ICreateTheCarDTO'
import { ICarsRepository } from '../ICarsRepository'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'

class CarsRepositoryInMemory implements ICarsRepository {

	public cars: Car[] = []

	async create(data: ICreateTheCarDTO): Promise<Car> {
		const car = new Car()

		Object.assign(car, {
			...data,
		})

		this.cars.push(car)
		return car
	}

	async findByLicencePlate(licence_plate: string): Promise<Car> {
		const car = this.cars.find((car) => car.licence_plate === licence_plate)
		return car
	}

	async findAvailable(
		name?: string,
		category_id?: string,
		brand?: string,
	): Promise<Car[]> {
		return this.cars.filter((car) => {
			if (
				car.available === true || (brand && car.brand === brand) ||
				(name && car.name === name) ||
				(category_id && car.category_id === category_id)
      ) {
        return car
      }
      return null
		})
	}

	async findById(car_id: string): Promise<Car> {
		return this.cars.find(car => car.id === car_id)
	}
}

export { CarsRepositoryInMemory }
