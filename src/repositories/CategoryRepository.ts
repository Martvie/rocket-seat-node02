import { ICategory, ICategoryCreation } from "../interfaces/categories";
import { prisma } from "../lib/prisma";

export class CategoryRepository {
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

    async fingByName(name: string) {
        const response = await prisma.category.findFirst({
            where: {
                name: name,
            },
        });

        return response;
    }
}
