import { FastifyReply, FastifyRequest } from "fastify";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

export class ImportCategoryController {
    constructor(private importCategoryUseCase: ImportCategoryUseCase) {}
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const data = await request.file();
        this.importCategoryUseCase.execute(data);
        return reply.send();
    }
}
