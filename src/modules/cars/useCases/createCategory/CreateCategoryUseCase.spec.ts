import { AppError } from '@shared/errors/AppError'
import { CategoriesRepositoryInMemory } from '../../repositories/in-memory/CategoriesRepositoryInMemory'
import { CreateCategoryUseCase } from './CreateCategoryUseCase'

let createCategoryUseCase: CreateCategoryUseCase
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

describe('Category Create', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory)
  })

  it('Should be able to create a new category', async () => {
    const category = {
      name: 'category test',
      description: 'category description test'
    }
    await createCategoryUseCase.execute(category)
    const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name)
    expect(categoryCreated).toHaveProperty('id')
  })

  it('Should not be able to create a new category with same name', async () => {
    const category = {
      name: 'category test',
      description: 'category description test'
    }
    await createCategoryUseCase.execute(category) // 1º
    await expect(
      createCategoryUseCase.execute(category) // 2ª
    ).rejects.toEqual(new AppError('Categories already exists'))
  })
})
