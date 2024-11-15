import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { AuthUserUseCase } from './AuthUserUseCase'
import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { ICreateUsersDTO } from '@modules/accounts/dtos/ICreateUsersDTO'
import { AppError } from '@shared/errors/AppError'
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory'
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'

let createUserUseCase: CreateUserUseCase
let authUserUseCase: AuthUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let dataProvider: DayjsDateProvider

describe('Authenticate User', () => {
  
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    dataProvider = new DayjsDateProvider()
    authUserUseCase = new AuthUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dataProvider
    )
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it('Should be able to create an user', async () => {
    const user: ICreateUsersDTO = {
      name: 'teste',
      email: 'teste@gmail.com',
      password: '1234',
      driver_licence: 'aaaaaaaaaaa'
    }
    await createUserUseCase.execute(user)

    const result = await authUserUseCase.execute({
      email: user.email,
      password: user.password
    })

    expect(result).toHaveProperty('token')
  })

  it('Should not be able to authenticate an nonexists user', async () => {
    await expect(
      authUserUseCase.execute({
        email: 'fakemail@gmail.com',
        password: '4321'
      })
    ).rejects.toEqual(new AppError('email or password incorrect'))
  })

  it('Should not be able to authenticate with password incorrect', async () => {
    const user: ICreateUsersDTO = {
      name: 'gdflnvbrfki teste',
      email: 'gnefklrgbwei@gmail.com',
      password: '1234',
      driver_licence: 'aaaaaaaaaaa'
    }
    await createUserUseCase.execute(user)
    await expect(
      authUserUseCase.execute({
        email: user.email,
        password: '12345'
      })
    ).rejects.toEqual(new AppError('email or password incorrect'))
  })
})
