import 'reflect-metadata'
import { container } from 'tsyringe'

import '@shared/container/providers'

import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository'
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'

import { SpecificationRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationRepository'
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository'

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'

import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'

import { CarsImageRepository } from '@modules/cars/infra/typeorm/repositories/CarsImageRepository'
import { ICarsImageRepository } from '@modules/cars/repositories/ICarsImageRepository'

import { RentalsRepository } from '@modules/rentals/infra/typeorm/repositories/RentalsRepository'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'

container.registerSingleton<ICategoriesRepository>(
	'CategoriesRepository',
	CategoriesRepository,
)

container.registerSingleton<ISpecificationRepository>(
	'SpecificationRepository',
	SpecificationRepository,
)

container.registerSingleton<IUsersRepository>(
	'UsersRepository',
	UsersRepository
)

container.registerSingleton<ICarsRepository>(
	'CarsRepository',
	CarsRepository
)

container.registerSingleton<ICarsImageRepository>(
	'CarsImageRepository',
	CarsImageRepository
)

container.registerSingleton<IRentalsRepository>(
	'RentalsRepository',
	RentalsRepository
)