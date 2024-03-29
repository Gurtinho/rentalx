import { Router } from 'express';
import multer from 'multer';
import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoryController } from '@modules/cars/useCases/listCategory/ListCategoryController';

import { EnsureAuth } from '@shared/infra/http/middlewares/EnsureAuth';
import { EnsureAdmin } from '../middlewares/EnsureAdmin';

export const categoriesRoutes = Router();

const upload = multer({
    dest: './tmp'
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoryController = new ListCategoryController();

categoriesRoutes.post('/',
    EnsureAuth,
    EnsureAdmin,
    createCategoryController.handle
);
categoriesRoutes.get('/',
    listCategoryController.handle
);
categoriesRoutes.post('/import',
    upload.single('file'),
    EnsureAuth,
    EnsureAdmin,
    importCategoryController.handle
);