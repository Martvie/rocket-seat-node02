import { inject, injectable } from "tsyringe";
import { ICategory, ICategoryRepository } from "../../../../interfaces/categories";

@injectable()
export class ListCategoryUseCase {
    constructor(
        @inject("CategoryRepository")
        private categoryRepository: ICategoryRepository
    ) {}
    async execute(): Promise<ICategory[]> {
        const categories = this.categoryRepository.list();
        return categories;
    }
}
