import { Repository } from 'typeorm'
import { dataConnection } from '@shared/infra/typeorm/data-source'
import { ICreateTheCarDTO } from '@modules/cars/dtos/ICreateTheCarDTO'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { Car } from '@modules/cars/infra/typeorm/entities/Car'

class CarsRepository implements ICarsRepository {
	private repository: Repository<Car>

	constructor() {
		this.repository = dataConnection.getRepository(Car)
	}

	async create({
		brand,
		category_id,
		daily_rate,
		description,
		fine_amount,
		licence_plate,
		name,
		specifications,
		id
	}: ICreateTheCarDTO): Promise<Car> {
		const car = this.repository.create({
			brand,
			category_id,
			daily_rate,
			description,
			fine_amount,
			licence_plate,
			name,
			specifications,
			id
		})
		await this.repository.save(car)
		return car
	}

	async findByLicencePlate(licence_plate: string): Promise<Car> {
		const car = await this.repository.findOneBy({
			licence_plate,
		})
		return car
	}

	async findAvailable(
		name?: string,
		category_id?: string,
		brand?: string,
	): Promise<Car[]> {
		const carsQuery = this.repository
			.createQueryBuilder('c')
			.where('available = :available', { available: true })
		if (brand) {
			carsQuery.andWhere('c.brand = :brand', { brand: brand })
		}
		if (name) {
			carsQuery.andWhere('c.name = :name', { name: name })
		}
		if (category_id) {
			carsQuery.andWhere('c.category_id', { category_id })
		}
		const cars = await carsQuery.getMany()
		return cars
	}

	async findById(car_id: string): Promise<Car> {
		return await this.repository.findOneBy({ id: car_id })
	}
}

export { CarsRepository }
