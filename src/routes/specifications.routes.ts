import { Router } from 'express';
import { SpecificationRepository } from '../modules/cars/repositories/SpecificationRepository';
import { CreateSpecificationService } from '../modules/cars/services/CreateSpecificationService';

const specificationsRoutes = Router();
const specificationRepository = new SpecificationRepository();
const createSpecificationService = new CreateSpecificationService(specificationRepository);

specificationsRoutes.post('/', (request, response) => {
    const { name, description } = request.body;
    createSpecificationService.execute({ name, description });
    return response.status(201).send();
});

export { specificationsRoutes }
