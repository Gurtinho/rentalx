import { Router } from 'express'
import { AuthUserController } from '@modules/accounts/useCases/authUser/AuthUserController';

const authUserController = new AuthUserController()

export const authRoutes = Router();

authRoutes.post('/sessions', authUserController.handle)
