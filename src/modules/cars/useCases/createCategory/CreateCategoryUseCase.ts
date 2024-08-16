import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError";
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
            throw new AppError("Category Alredy exist!", 409);
        }
        await this.categoryRepository.create({ name, description });
    }
}
