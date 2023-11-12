import { Request, Response } from 'express'
import { resolve } from 'path';
import { DevolutionRentalUseCase } from './DevolutionRentalUseCase';
import { container } from 'tsyringe';

class DevolutionRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { id: user_id } = request.user
    const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase)
    const devolution = await devolutionRentalUseCase.execute({ id, user_id })
    return response.status(201).send(devolution)
  }
}

export { DevolutionRentalController }