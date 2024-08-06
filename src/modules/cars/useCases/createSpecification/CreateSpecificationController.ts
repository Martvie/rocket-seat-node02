import { FastifyReply, FastifyRequest } from "fastify";
import { container } from "tsyringe";
import { ISpecificationCreation } from "../../../../interfaces/specification";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

export class CreateSpecificationController {
    async handle(reques: FastifyRequest<{ Body: ISpecificationCreation }>, reply: FastifyReply) {
        const { name, description } = reques.body;
        const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase);
        await createSpecificationUseCase.execute({ name, description });
        return reply.status(201).send({ message: "Specification Created" });
    }
}
