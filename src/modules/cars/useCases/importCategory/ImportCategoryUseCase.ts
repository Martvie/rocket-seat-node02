import { parse } from "csv-parse";
import fs from "fs";
import { ICategoryCreation, ICategoryRepository } from "../../../../interfaces/categories";
import { IMultipartFile } from "../../../../interfaces/multipart";

export class ImportCategoryUseCase {
    constructor(private categoriesRepository: ICategoryRepository) {}

    async loadCategories(file: IMultipartFile | undefined): Promise<ICategoryCreation[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file!.filename);
            const categories: ICategoryCreation[] = [];
            const parseFile = parse();
            stream.pipe(parseFile);

            parseFile
                .on("data", async (line) => {
                    const [name, description] = line;
                    categories.push({ name, description });
                })
                .on("end", () => {
                    resolve(categories);
                })
                .on("error", (err) => {
                    reject(err);
                });

            return categories;
        });
    }

    async execute(file: IMultipartFile | undefined) {
        const categories = await this.loadCategories(file);
        categories.map(async (category) => {
            const { name, description } = category;

            const alredyExist = await this.categoriesRepository.findByName(name);
            if (!alredyExist) {
                this.categoriesRepository.create({
                    name,
                    description,
                });
            }
        });
    }
}
