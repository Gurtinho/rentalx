import 'reflect-metadata';
import { container } from 'tsyringe';

import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository';
import { CategoriesRepository } from '../../modules/cars/repositories/Implementations/CategoriesRepository';

import { ISpecificationRepository } from '../../modules/cars/repositories/ISpecificationRepository';
import { SpecificationRepository } from '../../modules/cars/repositories/Implementations/SpecificationRepository';

import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository';
import { UsersRepository } from '../../modules/accounts/repositories/implementations/UsersRepository';

// Passagem de tipagem generica para a função
container.registerSingleton<ICategoriesRepository>(
    'CategoriesRepository',
    CategoriesRepository
);
container.registerSingleton<ISpecificationRepository>(
    'SpecificationRepository',
    SpecificationRepository
);
container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository
);
