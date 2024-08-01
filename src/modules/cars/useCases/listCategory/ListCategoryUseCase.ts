import { ICategory, ICategoryRepository } from "../../../../interfaces/categories";

export class ListCategoryUseCase {
    constructor(private categoryRepository: ICategoryRepository) {}
    async execute(): Promise<ICategory[]> {
        const categories = this.categoryRepository.list();
        return categories;
    }
}
