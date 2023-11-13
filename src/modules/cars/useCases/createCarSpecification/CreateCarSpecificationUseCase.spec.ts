import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase'
import { SpecificationRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory'
import { AppError } from '@shared/errors/AppError'

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory

describe('Create Car Specification', () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    specificationsRepositoryInMemory = new SpecificationRepositoryInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory)
  })

  it('should not be able to add a new specification for a non-existent car', async () => {
    const car_id = '1234'
    const specification_id = ['543221']
    await expect(
      createCarSpecificationUseCase.execute({ car_id, specification_id })
    ).rejects.toEqual(new AppError('Cars does not exists'))
  })

  it('should be able to add a new specification for the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'gol',
			description: 'cano estourado',
			licence_plate: 'aay6877',
			fine_amount: 60,
			daily_rate: 100,
			brand: 'brand',
			category_id: 'category',
    })

    const specification = await specificationsRepositoryInMemory.create({
      name: 'test',
      description: 'test'
    })

    const specification_id = [specification.id]

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id, specification_id
    })

    expect(specificationsCars).toHaveProperty('specifications')
    expect(specificationsCars.specifications.length).toBe(1)
  })
})
