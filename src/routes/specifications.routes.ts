import { Router } from 'express';
import { SpecificationRepository } from '../modules/cars/repositories/SpecificationRepository';
import { CreateSpecificationService } from '../modules/cars/services/CreateSpecificationService';

const specificationRoutes = Router();
const specificationRepository = new SpecificationRepository();
const createSpecificationService = new CreateSpecificationService(specificationRepository);

specificationRoutes.post('/', (request, response) => {
    const { name, description } = request.body;
    createSpecificationService.execute({ name, description });
    return response.status(201).send();
});

export { specificationRoutes }
