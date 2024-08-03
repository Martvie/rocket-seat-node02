import { FastifyReply, FastifyRequest } from "fastify";
import { ISpecificationCreation } from "../../../../interfaces/specification";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

export class CreateSpecificationController {
    constructor(private createSpecificationUseCase: CreateSpecificationUseCase) {}

    async handle(reques: FastifyRequest<{ Body: ISpecificationCreation }>, reply: FastifyReply) {
        const { name, description } = reques.body;
        const alredyExist = await this.createSpecificationUseCase.execute({ name, description });
        if (alredyExist) {
            return reply.status(409).send({ message: "Specification alredy exist!" });
        }
        return reply.status(202).send({ message: "specification created" });
    }
}
