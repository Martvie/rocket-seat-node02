import { FastifyReply, FastifyRequest } from "fastify";
import { ListCategoryUseCase } from "./ListCategoryUseCase";

export class ListCategoryController {
    constructor(private listCategoryUseCase: ListCategoryUseCase) {}

    async haddle(request: FastifyRequest, reply: FastifyReply) {
        const list = await this.listCategoryUseCase.execute();

        return reply.status(200).send(list);
    }
}
