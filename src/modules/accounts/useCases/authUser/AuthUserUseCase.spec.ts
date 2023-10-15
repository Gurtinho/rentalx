import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { AuthUserUseCase } from './AuthUserUseCase'
import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { ICreateUsersDTO } from '@modules/accounts/dtos/ICreateUsersDTO'
import { AppError } from '@shared/errors/AppError'

let createUserUseCase: CreateUserUseCase
let authUserUseCase: AuthUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory

describe('Authenticate User', () => {
  
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    authUserUseCase = new AuthUserUseCase(usersRepositoryInMemory)
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it('Should be able to create an user', async () => {
    const user: ICreateUsersDTO = {
      name: 'gustavo litter teste',
      email: 'gustavolitter@gmail.com',
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

  it('Should not be able to authenticate an nonexists user', () => {
    expect( async () => {
      await authUserUseCase.execute({
        email: 'fakemail@gmail.com',
        password: '4321'
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to authenticate with password incorrect', () => {
    expect( async () => {
      const user: ICreateUsersDTO = {
        name: 'gustavo litter teste',
        email: 'gustavolitter@gmail.com',
        password: '1234',
        driver_licence: 'aaaaaaaaaaa'
      }
      await createUserUseCase.execute(user)

      await authUserUseCase.execute({
        email: user.email,
        password: '1234'
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
