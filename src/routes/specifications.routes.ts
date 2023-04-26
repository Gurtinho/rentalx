import { Router } from 'express';
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController';
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post('/',
    EnsureAuthenticated,
    createSpecificationController.handle
);

export { specificationsRoutes };
