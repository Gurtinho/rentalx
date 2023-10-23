import { Router } from 'express'
import { EnsureAuth } from '../middlewares/EnsureAuth';
import { EnsureAdmin } from '../middlewares/EnsureAdmin';

import { CreateTheCarController } from '@modules/cars/useCases/createCar/CreateTheCarController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listCars/ListAvailableCarsController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { UploadCarImageController } from '@modules/cars/useCases/uploadCarImage/UploadCarImageController';
import multer from 'multer';
import { upload } from '@config/upload';

const createTheCarController = new CreateTheCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImageController = new UploadCarImageController()

export const carsRoutes = Router();

const uploadCarImage = multer(upload('./tmp/cars'))

carsRoutes.post('/', EnsureAuth, EnsureAdmin, createTheCarController.handle)

carsRoutes.post('/specifications/:id', EnsureAuth, EnsureAdmin, createCarSpecificationController.handle)

carsRoutes.post('/images/:id',
  EnsureAuth,
  EnsureAdmin,
  uploadCarImage.array('images'),
  uploadCarImageController.handle
)

carsRoutes.get('/available', listAvailableCarsController.handle)
