import { AppError } from '@shared/errors/AppError'
import { CreateTheCarUseCase } from './CreateTheCarUseCase'
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'

let createTheCarUseCase: CreateTheCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('Create a new car', () => {
	beforeEach(() => {
		carsRepositoryInMemory = new CarsRepositoryInMemory()
		createTheCarUseCase = new CreateTheCarUseCase(carsRepositoryInMemory)
	})

	it('should be able to create a new car', async () => {
		const car = await createTheCarUseCase.execute({
			name: 'gol',
			description: 'cano estourado',
			licence_plate: 'aay6877',
			fine_amount: 60,
			daily_rate: 100,
			brand: 'brand',
			category_id: 'category',
    })
    expect(car).toHaveProperty('id')
	})

	it('should not be able to create a new car with exists licence plate', async () => {
		await createTheCarUseCase.execute({
			name: 'gol',
			description: 'cano estourado',
			licence_plate: 'aay6877',
			fine_amount: 60,
			daily_rate: 100,
			brand: 'brand',
			category_id: 'category',
		})
		await expect(
			createTheCarUseCase.execute({
				name: 'gol',
				description: 'cano estourado',
				licence_plate: 'aay6877',
				fine_amount: 60,
				daily_rate: 100,
				brand: 'brand',
				category_id: 'category',
			})
		).rejects.toEqual(new AppError('Car already exists', 400))
	})

	it('should be able to create a new car with available as true by default', async () => {
		const car = await createTheCarUseCase.execute({
			name: 'gol',
			description: 'cano estourado',
			licence_plate: 'aay6877',
			fine_amount: 60,
			daily_rate: 100,
			brand: 'brand',
			category_id: 'category',
    })
    expect(car.available).toBeTruthy()
	})
})
