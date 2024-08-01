import { FastifyReply, FastifyRequest } from "fastify";
import { ICategoryCreation } from "../../../../interfaces/categories";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export class CreateCategoryController {
    constructor(private createCategoryUseCase: CreateCategoryUseCase) {}
    async handle(request: FastifyRequest<{ Body: ICategoryCreation }>, reply: FastifyReply): Promise<Response> {
        const { name, description } = request.body;
        this.createCategoryUseCase.execute({ name, description });
        return reply.status(201).send({ message: "Category created" });
    }
}
