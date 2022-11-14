System.register("models/Category", ["uuid"], function (exports_1, context_1) {
    "use strict";
    var uuid_1, Category;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (uuid_1_1) {
                uuid_1 = uuid_1_1;
            }
        ],
        execute: function () {
            Category = class Category {
                id;
                name;
                description;
                created_at;
                constructor() {
                    if (!this.id) {
                        this.id = uuid_1.v4();
                    }
                }
            };
            exports_1("Category", Category);
        }
    };
});
System.register("repositories/CategoriesRepository", ["models/Category"], function (exports_2, context_2) {
    "use strict";
    var Category_1, CategoriesRepository;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (Category_1_1) {
                Category_1 = Category_1_1;
            }
        ],
        execute: function () {
            CategoriesRepository = class CategoriesRepository {
                categories;
                constructor() {
                    this.categories = [];
                }
                create({ name, description }) {
                    const category = new Category_1.Category;
                    Object.assign(category, {
                        name,
                        description,
                        created_at: new Date()
                    });
                    this.categories.push(category);
                }
                list() {
                    return this.categories;
                }
                findByName(name) {
                    const category = this.categories.find(category => category.name == name);
                    return category;
                }
            };
            exports_2("CategoriesRepository", CategoriesRepository);
        }
    };
});
System.register("services/CreateCategoryServices", [], function (exports_3, context_3) {
    "use strict";
    var CreateCategoryService;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
            CreateCategoryService = class CreateCategoryService {
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
            };
            exports_3("CreateCategoryService", CreateCategoryService);
        }
    };
});
System.register("routes/categories.routes", ["express", "repositories/CategoriesRepository", "services/CreateCategoryServices"], function (exports_4, context_4) {
    "use strict";
    var express_1, CategoriesRepository_1, CreateCategoryServices_1, categoriesRoutes, categoriesRepository;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (express_1_1) {
                express_1 = express_1_1;
            },
            function (CategoriesRepository_1_1) {
                CategoriesRepository_1 = CategoriesRepository_1_1;
            },
            function (CreateCategoryServices_1_1) {
                CreateCategoryServices_1 = CreateCategoryServices_1_1;
            }
        ],
        execute: function () {
            categoriesRoutes = express_1.Router();
            exports_4("categoriesRoutes", categoriesRoutes);
            categoriesRepository = new CategoriesRepository_1.CategoriesRepository;
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
        }
    };
});
System.register("server", ["express", "routes/categories.routes"], function (exports_5, context_5) {
    "use strict";
    var express_2, categories_routes_1, app;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (express_2_1) {
                express_2 = express_2_1;
            },
            function (categories_routes_1_1) {
                categories_routes_1 = categories_routes_1_1;
            }
        ],
        execute: function () {
            app = express_2.default();
            app.use(express_2.default.json());
            app.use('/categories', categories_routes_1.categoriesRoutes);
            app.get('/', (request, response) => {
                return response.status(201).send();
            });
            app.listen(3333);
        }
    };
});
System.register("models/Specifications", ["uuid"], function (exports_6, context_6) {
    "use strict";
    var uuid_2, Specifications;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (uuid_2_1) {
                uuid_2 = uuid_2_1;
            }
        ],
        execute: function () {
            Specifications = class Specifications {
                id;
                name;
                description;
                created_at;
                constructor() {
                    if (!this.id) {
                        this.id = uuid_2.v4();
                    }
                }
            };
            exports_6("Specifications", Specifications);
        }
    };
});
System.register("services/CreateSpecificationService", [], function (exports_7, context_7) {
    "use strict";
    var CreateSpecificationService;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [],
        execute: function () {
            CreateSpecificationService = class CreateSpecificationService {
                execute() {
                    console.log('hi');
                }
            };
            exports_7("CreateSpecificationService", CreateSpecificationService);
        }
    };
});
