import { Router } from 'express';
import multer, { Multer } from 'multer';

import { AppError } from '../errors/AppError';
import { upload } from '../config/upload';
import { EnsureAuthenticated } from '../middlewares/EnsureAuthenticated';

import { CreateUserController } from '../modules/accounts/useCases/CreateUser/CreateUserController';
import { ListUserController } from '../modules/accounts/useCases/ListUser/ListUserController';
import { UpdateAvatarUserController } from '../modules/accounts/useCases/UpdateAvatarUser/UpdateAvatarUserController';

const usersRoutes = Router();

const uploadAvatar = multer(upload('./tmp/avatar'));

const createUserController = new CreateUserController();
const listUserController = new ListUserController();
const updateAvatarUserController = new UpdateAvatarUserController();

usersRoutes.post('/',
    createUserController.handle
);
usersRoutes.get('/',
    listUserController.handle
);
usersRoutes.patch('/avatar',
    EnsureAuthenticated,
    uploadAvatar.single('avatar'),
    updateAvatarUserController.handle
);

export { usersRoutes };