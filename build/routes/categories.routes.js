"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRoutes = void 0;
const express_1 = require("express");
const CategoriesRepository_1 = require("../repositories/CategoriesRepository");
const CreateCategoryServices_1 = require("../services/CreateCategoryServices");
const categoriesRoutes = (0, express_1.Router)();
exports.categoriesRoutes = categoriesRoutes;
const categoriesRepository = new CategoriesRepository_1.CategoriesRepository;
categoriesRoutes.post('/', (request, response) => {
    const { name, description } = request.body;
    const categoriesServices = new CreateCategoryServices_1.CreateCategoryService(categoriesRepository);
    categoriesServices.execute({ name, description });
    return response.status(201).send();
});
categoriesRoutes.get('/', (request, response) => {
    const all = categoriesRepository.list();
    return response.status(201).json(all);
});
