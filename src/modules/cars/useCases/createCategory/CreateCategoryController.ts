import { FastifyReply, FastifyRequest } from "fastify";
import { ICategoryCreation } from "../../../../interfaces/categories";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export class CreateCategoryController {
    constructor(private createCategoryUseCase: CreateCategoryUseCase) {}
    async handle(request: FastifyRequest<{ Body: ICategoryCreation }>, reply: FastifyReply): Promise<Response> {
        const { name, description } = request.body;
        const alredyExist = await this.createCategoryUseCase.execute({ name, description });

        if (alredyExist) {
            return reply.status(409).send({ message: "Category alredy exist!" });
        }

        return reply.status(201).send({ message: "Category created" });
    }
}
