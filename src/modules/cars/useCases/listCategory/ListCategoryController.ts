import { FastifyReply, FastifyRequest } from "fastify";
import { container } from "tsyringe";
import { ListCategoryUseCase } from "./ListCategoryUseCase";

export class ListCategoryController {
    async haddle(request: FastifyRequest, reply: FastifyReply) {
        const listCategoryUseCase = container.resolve(ListCategoryUseCase);
        const list = await listCategoryUseCase.execute();

        return reply.status(200).send(list);
    }
}
