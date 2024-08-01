import { ISpecification, ISpecificationCreation, ISpecificationRepository } from "../../../interfaces/specification";
import { prisma } from "../../../lib/prisma";

export class SpecificationRepository implements ISpecificationRepository {
    async create({ name, description }: ISpecificationCreation): Promise<ISpecificationCreation> {
        const specification: ISpecificationCreation = await prisma.specification.create({
            data: {
                name,
                description,
            },
        });

        return specification;
    }

    async list(): Promise<ISpecification[]> {
        const specifications = await prisma.specification.findMany();
        return specifications;
    }

    async findByName(name: string): Promise<ISpecification | null> {
        const response: ISpecification | null = await prisma.specification.findFirst({
            where: {
                name: name,
            },
        });

        return response;
    }
}
