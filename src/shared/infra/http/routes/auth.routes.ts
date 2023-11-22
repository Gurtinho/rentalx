import { Router } from 'express'
import { AuthUserController } from '@modules/accounts/useCases/authUser/AuthUserController';
import { RefreshTokenController } from '@modules/accounts/useCases/refreshToken/RefreshTokenController';

const authUserController = new AuthUserController()
const refreshTokenController = new RefreshTokenController()

export const authRoutes = Router();

authRoutes.post('/sessions', authUserController.handle)

authRoutes.post('/refresh-token', refreshTokenController.handle)
