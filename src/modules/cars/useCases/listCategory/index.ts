import { CategoriesRepository } from '../../repositories/CategoriesRepository';
import { ListCategoryController } from './ListCategoryController';
import { ListCategoryUseCase } from './ListCategoryUseCase';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

const categoriesRepository = new CategoriesRepository();
const listCategoryUseCase = new ListCategoryUseCase(categoriesRepository);
const listCategoryController = new ListCategoryController();

export { listCategoryController }