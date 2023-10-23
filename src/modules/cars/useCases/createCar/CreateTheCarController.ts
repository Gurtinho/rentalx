import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateTheCarUseCase } from './CreateTheCarUseCase'

class CreateTheCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, brand, daily_rate, licence_plate, fine_amount, category_id } = request.body
    const createTheCarUseCase = container.resolve(CreateTheCarUseCase)
    const car = await createTheCarUseCase.execute({
      name, description, brand, daily_rate, licence_plate, fine_amount, category_id 
    })
    return response.status(200).send(car)
  }
}

export { CreateTheCarController }