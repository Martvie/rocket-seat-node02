import { FastifyReply, FastifyRequest } from "fastify";
import { container } from "tsyringe";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

export class ImportCategoryController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const importCategoryUseCase = container.resolve(ImportCategoryUseCase);
        const data = await request.file();
        importCategoryUseCase.execute(data);
        return reply.send();
    }
}
