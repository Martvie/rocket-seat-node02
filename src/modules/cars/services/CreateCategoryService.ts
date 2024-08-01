import { ICategoryCreation, ICategoryRepository } from "../../../interfaces/categories";

export class CreateCategoryService {
    constructor(private categoryRepository: ICategoryRepository) {}
    async execute({ name, description }: ICategoryCreation) {
        try {
            const categoryAlredyExist = await this.categoryRepository.findByName(name);

            if (categoryAlredyExist) {
                throw new Error("Category alredy exist!");
            }

            this.categoryRepository.create({ name, description });
        } catch (error) {
            console.log(error);
        }
    }
}
