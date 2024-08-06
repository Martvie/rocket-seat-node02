import { FastifyReply, FastifyRequest } from "fastify";
import { container } from "tsyringe";
import { ICategoryCreation } from "../../../../interfaces/categories";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export class CreateCategoryController {
    async handle(request: FastifyRequest<{ Body: ICategoryCreation }>, reply: FastifyReply): Promise<void> {
        const { name, description } = request.body;
        const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

        await createCategoryUseCase.execute({ name, description });

        return reply.status(201).send({ message: "Category created" });
    }
}
