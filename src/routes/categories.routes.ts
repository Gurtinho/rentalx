import { Router } from 'express';
import { CategoriesRepository } from '../repositories/CategoriesRepository';
import { CreateCategoryService } from '../services/CreateCategoryServices';
const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository;

categoriesRoutes.post('/', (request, response) => { // teste
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