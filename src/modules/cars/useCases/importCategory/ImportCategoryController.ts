import { FastifyReply } from "fastify";
import { ICustomFastifyRequest } from "../../../../interfaces/multer";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

export class ImportCategoryController {
    constructor(private importCategoryUseCase: ImportCategoryUseCase) {}
    handle(request: ICustomFastifyRequest, reply: FastifyReply) {
        const { file } = request;
        this.importCategoryUseCase.execute(file);
        return reply.send();
    }
}
