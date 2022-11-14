"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoryService = void 0;
class CreateCategoryService {
    categoriesRepository;
    constructor(categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    } // hackzinho
    execute({ name, description }) {
        const categoriesAlreadyExists = this.categoriesRepository.findByName(name);
        if (categoriesAlreadyExists) {
            throw new Error('Categories already exists');
        }
        this.categoriesRepository.create({ name, description });
    }
}
exports.CreateCategoryService = CreateCategoryService;
