import { AppError } from "@shared/errors/AppError"
import dayjs from "dayjs"
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider"
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let carsRepositoryInMemory: CarsRepositoryInMemory
let dayjsDateProvider: DayjsDateProvider

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate()
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    dayjsDateProvider = new DayjsDateProvider()
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    )
    })

  it('Should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'test',
      description: 'test',
      daily_rate: 100,
      licence_plate: 'test',
      fine_amount: 40,
      category_id: '1234',
      brand: 'brand'
    })
    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: '12345',
      expected_return_date: dayAdd24Hours
    })
    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })

  it('Should not be able to create a new rental if there is another open to the same user', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: '1111',
      user_id: '12345',
      expected_return_date: dayAdd24Hours
    })
    await expect(
      createRentalUseCase.execute({
        car_id: '12345',
        user_id: '12345',
        expected_return_date: dayAdd24Hours
      })
    ).rejects.toEqual(new AppError('There is already in progress by user'))
  })

  it('Should not be able to create a new rental if there is another open to the same car', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: '55555',
      user_id: '12345',
      expected_return_date: dayAdd24Hours
    })
    await expect(
      createRentalUseCase.execute({
        car_id: '55555',
        user_id: '54321',
        expected_return_date: dayAdd24Hours
      })
    ).rejects.toEqual(new AppError('This car is not available'))
  })

  it('Should not be able to create a new rental with a invalid time', async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: '55555',
        user_id: '12345',
        expected_return_date: dayjs().toDate()
      })
    ).rejects.toEqual(new AppError('Invalid return time!'))
  })
})