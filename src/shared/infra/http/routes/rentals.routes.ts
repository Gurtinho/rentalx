import { Router } from "express";

import { EnsureAuth } from "../middlewares/EnsureAuth";
import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";

const createRentalController = new CreateRentalController()
const devolutionRentalController = new DevolutionRentalController()
const listRentalsByUserController = new ListRentalsByUserController()

export const rentalsRoutes = Router()

rentalsRoutes.post('/', EnsureAuth, createRentalController.handle)
rentalsRoutes.post('/devolution/:id', EnsureAuth, devolutionRentalController.handle)
rentalsRoutes.get('/', EnsureAuth, listRentalsByUserController.handle)