import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { ListAvailableCarsUseCase } from '@modules/cars/useCases/listCars/ListAvailableCarsUseCase'

let listAvailableCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('List Cars', () => {
	beforeEach(() => {
		carsRepositoryInMemory = new CarsRepositoryInMemory()
		listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
	})

	it('should be able to list cars', async () => {
		const car = await carsRepositoryInMemory.create({
			name: 'gol',
			description: 'ronca mto',
			fine_amount: 100,
			brand: 'aa',
			daily_rate: 100,
			licence_plate: 'placa_teste1',
			category_id: 'category_id',
		})
		const cars = await listAvailableCarsUseCase.execute({})
		expect(cars).toEqual([car])
	})

	it('should be able to list all cars available car brand', async () => {
		const car = await carsRepositoryInMemory.create({
			name: 'gol g2',
			description: 'ronca mto',
			fine_amount: 100,
			brand: 'aaaaaa',
			daily_rate: 100,
			licence_plate: 'placa_teste2',
			category_id: 'category_id',
		})
		const cars = await listAvailableCarsUseCase.execute({
			brand: 'aaaaaa'
		})
		expect(cars).toEqual([car])
	})

	it('should be able to list all cars available car name', async () => {
		const car = await carsRepositoryInMemory.create({
			name: 'gol g3',
			description: 'ronca mto',
			fine_amount: 100,
			brand: 'aaaaaa',
			daily_rate: 100,
			licence_plate: 'placa_teste2',
			category_id: 'category_id',
		})
		const cars = await listAvailableCarsUseCase.execute({
			name: 'gol g3'
		})
		expect(cars).toEqual([car])
	})

	it('should be able to list all cars available car category_id', async () => {
		const car = await carsRepositoryInMemory.create({
			name: 'gol g3',
			description: 'ronca mto',
			fine_amount: 100,
			brand: 'aaaaaa',
			daily_rate: 100,
			licence_plate: 'placa_teste2',
			category_id: 'teste_category_id',
		})
		const cars = await listAvailableCarsUseCase.execute({
			category_id: 'teste_category_id'
		})
		expect(cars).toEqual([car])
	})
})
