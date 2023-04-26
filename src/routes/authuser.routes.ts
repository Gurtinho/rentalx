import { Router } from 'express';

const authuserRoutes = Router();

import { AuthUserController } from '../modules/accounts/useCases/AuthUser/AuthUserController';

const authUserController = new AuthUserController();

authuserRoutes.post('/sessions',
    authUserController.handle
);

export { authuserRoutes };