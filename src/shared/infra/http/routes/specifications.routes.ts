import { Router } from 'express';
import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { EnsureAuth } from '../middlewares/EnsureAuth';
import { EnsureAdmin } from '../middlewares/EnsureAdmin';

export const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post('/',
    EnsureAuth,
    EnsureAdmin,
    createSpecificationController.handle
);
