import { ICategory, ICategoryCreation, ICategoryRepository } from "../../../interfaces/categories";
import { prisma } from "../../../lib/prisma";

export class CategoryRepository implements ICategoryRepository {
    async create({ name, description }: ICategoryCreation): Promise<ICategoryCreation> {
        const category = await prisma.category.create({
            data: {
                name,
                description,
            },
        });

        return category;
    }

    async list(): Promise<ICategory[]> {
        const list = await prisma.category.findMany();
        return list;
    }

    async findByName(name: string): Promise<ICategory | null> {
        const response: ICategory | null = await prisma.category.findFirst({
            where: {
                name: name,
            },
        });

        return response;
    }
}
