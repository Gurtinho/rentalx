import { Router } from 'express';
import { CategoriesRepository } from '../modules/cars/repositories/CategoriesRepository';
import { CreateCategoryService } from '../modules/cars/services/CreateCategoryServices';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository;

categoriesRoutes.post('/', (request, response) => {
    const { name, description } = request.body;
    const categoriesServices = new CreateCategoryService(categoriesRepository);
    categoriesServices.execute({ name, description });
    return response.status(201).send();
});

categoriesRoutes.get('/', (request, response) => {
    const all = categoriesRepository.list();
    return response.status(201).json(all);
})

export { categoriesRoutes };