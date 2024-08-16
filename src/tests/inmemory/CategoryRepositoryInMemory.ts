import { ICategory, ICategoryCreation, ICategoryRepository } from "../../interfaces/categories";
import { Category } from "../entities/Category";

export class CategoryRepositoryInMemory implements ICategoryRepository {
    categories: ICategory[] = [];

    create({ name, description }: ICategoryCreation): void {
        const category = new Category(name, description);

        this.categories.push(category);
    }

    async findByName(name: string): Promise<ICategory> {
        const category = this.categories.find((categories) => categories.name === name);
        return category!;
    }

    async list(): Promise<ICategory[]> {
        const list = this.categories;
        return list;
    }
}
