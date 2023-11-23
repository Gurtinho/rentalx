import { jest } from '@jest/globals'
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"
import { AppError } from '@shared/errors/AppError';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let usersRepositoryInMemory: UsersRepositoryInMemory
let mailProvider: MailProviderInMemory
let dateProvider: DayjsDateProvider

describe('Send forgot password mail', () => {
  beforeEach(() => {
    dateProvider = new DayjsDateProvider()
    mailProvider = new MailProviderInMemory()
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    )
  })

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail')
    await usersRepositoryInMemory.create({
      name: 'Estelle Richardson',
      email: 'jifpaeli@upevapa.sx',
      driver_licence: '60997122',
      password: '123456'
    })
    await sendForgotPasswordMailUseCase.execute('jifpaeli@upevapa.sx')
    expect(sendMail).toHaveBeenCalled()
  })

  it('should not be able to send email if users does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('vu@lenho.ni')
    ).rejects.toEqual(new AppError('User does not exists'))
  })

  it('should be able to create an users tokens', async () => {
    const generateTokenEmail = jest.spyOn(usersTokensRepositoryInMemory, 'create')
    await usersRepositoryInMemory.create({
      name: 'Mario Pearson',
      email: 'kadu@zik.af',
      driver_licence: '2927248983',
      password: '123456'
    })
    await sendForgotPasswordMailUseCase.execute('kadu@zik.af')
    expect(generateTokenEmail).toHaveBeenCalled()
  })
})