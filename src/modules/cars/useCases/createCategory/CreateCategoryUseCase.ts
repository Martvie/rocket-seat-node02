import { inject, injectable } from "tsyringe";
import { ICategoryCreation, ICategoryRepository } from "../../../../interfaces/categories";

@injectable()
export class CreateCategoryUseCase {
    constructor(
        @inject("CategoryRepository")
        private categoryRepository: ICategoryRepository
    ) {}
    async execute({ name, description }: ICategoryCreation) {
        const categoryAlredyExist = await this.categoryRepository.findByName(name);

        if (categoryAlredyExist) {
            throw new Error("Category Alredy exist!");
        }
        await this.categoryRepository.create({ name, description });
    }
}
