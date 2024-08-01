import { FastifyReply, FastifyRequest } from "fastify";
import { ISpecificationCreation } from "../../../../interfaces/specification";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

export class CreateSpecificationController {
    constructor(private createSpecificationUseCase: CreateSpecificationUseCase) {}

    async handle(reques: FastifyRequest<{ Body: ISpecificationCreation }>, reply: FastifyReply) {
        const { name, description } = reques.body;
        this.createSpecificationUseCase.execute({ name, description });
        return reply.status(202).send({ message: "specification created" });
    }
}
