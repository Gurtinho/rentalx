import { Specification } from '@modules/cars/infra/typeorm/entities/Specification'
import { ICreateSpecificationDTO, ISpecificationRepository } from '../ISpecificationRepository'

class SpecificationRepositoryInMemory implements ISpecificationRepository {

  private specification: Specification[] = [];

  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification()
    Object.assign(specification, {
      name,
      description
    })
    this.specification.push(specification)
    return specification
  }
  async findByName(name: string): Promise<Specification> {
    return this.specification.find(specification => specification.name === name)
  }
  async findById(ids: string[]): Promise<Specification[]> {
    return this.specification.filter(specification => ids.includes(specification.id))
  }
}

export { SpecificationRepositoryInMemory }
