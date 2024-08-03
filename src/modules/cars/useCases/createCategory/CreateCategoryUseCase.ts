import { ICategoryCreation, ICategoryRepository } from "../../../../interfaces/categories";

export class CreateCategoryUseCase {
    constructor(private categoryRepository: ICategoryRepository) {}
    async execute({ name, description }: ICategoryCreation) {
        const categoryAlredyExist = await this.categoryRepository.findByName(name);

        if (!categoryAlredyExist) {
            this.categoryRepository.create({ name, description });
        }

        return categoryAlredyExist;
    }
}
