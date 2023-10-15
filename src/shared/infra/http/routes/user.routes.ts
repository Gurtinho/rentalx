import { Router } from 'express'

import { EnsureAuth } from '@shared/infra/http/middlewares/EnsureAuth'
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController'
import { UpdateAvatarUserController } from '@modules/accounts/useCases/updateAvatarUser/UpdateAvatarUserController'
import multer from 'multer'
import { upload } from '@config/upload'

const createUserController = new CreateUserController()
const updateAvatarUserController = new UpdateAvatarUserController()

const uploadAvatar = multer(upload('./tmp/avatar'))

export const usersRoutes = Router()

usersRoutes.post('/', createUserController.handle)

usersRoutes.patch('/avatar', EnsureAuth, uploadAvatar.single('avatar'), updateAvatarUserController.handle)