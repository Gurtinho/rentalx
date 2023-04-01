import fs from 'fs';
import { parse as csvParse } from 'csv-parse';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IImportCategory {
    name: string;
    description: string
}

class ImportCategoryUseCase {

    private categoriesRepository: ICategoriesRepository;
    constructor(categoriesRepository: ICategoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);
            const categories: IImportCategory[] = [];
            const parseFile = csvParse();
            stream.pipe(parseFile);

            parseFile.on('data', async (line) => {
                const [name, description] = line;
                categories.push({
                    name,
                    description
                })
            }).on('end', () => {
                resolve(categories);
                fs.promises.unlink(file.path);
            }).on('error', (error) => {
                reject(error);
            });
        })
    }
    
    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);
        categories.map( async category => {
            const { name, description } = category;
            const existsCategory = this.categoriesRepository.findByName(name);
            if (!existsCategory) {
                this.categoriesRepository.create({
                    name,
                    description
                });
            }
        });
    }
    
}

export { ImportCategoryUseCase }