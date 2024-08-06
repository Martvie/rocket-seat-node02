import { MultipartFile } from "@fastify/multipart";
import { parse } from "csv-parse";
import path from "path";
import { inject, injectable } from "tsyringe";
import { ICategoryCreation, ICategoryRepository } from "../../../../interfaces/categories";

const fs = require("fs");
const util = require("util");
const { pipeline } = require("stream");
const pump = util.promisify(pipeline);

@injectable()
export class ImportCategoryUseCase {
    constructor(
        @inject("CategoryRepository")
        private categoriesRepository: ICategoryRepository
    ) {}

    async loadCategories(file: MultipartFile | undefined): Promise<ICategoryCreation[]> {
        const data = file;
        const customDir = path.join(__dirname, "../../../../../tmp"); //pasta onde é salvo
        const filePath = path.join(customDir, data!.filename); // caminho do arquivo
        fs.mkdirSync(customDir, { recursive: true });
        await pump(data!.file, fs.createWriteStream(filePath));

        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(filePath);
            const categories: ICategoryCreation[] = [];
            const parseFile = parse();
            stream.pipe(parseFile);

            parseFile
                .on("data", async (line: [string, string]) => {
                    const [name, description] = line;
                    categories.push({ name, description });
                })
                .on("end", () => {
                    fs.promises.unlink(filePath);
                    setTimeout(() => {
                        3000;
                    });
                    resolve(categories);
                })
                .on("error", (err: Error) => {
                    reject(err);
                });

            return categories;
        });
    }

    async execute(file: MultipartFile | undefined) {
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
