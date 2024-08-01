import { FastifyInstance } from "fastify";
import { ISpecificationCreation } from "../interfaces/specification";
import { SpecificationRepository } from "../modules/cars/repositories/SpecificationRepository";
import { CreateSpecificationService } from "../modules/cars/services/CreateSpecificationService";

const specificationRepoitory = new SpecificationRepository();

export async function specificationRoutes(app: FastifyInstance) {
    app.post<{ Body: ISpecificationCreation }>("/", (request, reply) => {
        const { name, description } = request.body;
        const createSpecificationService = new CreateSpecificationService(specificationRepoitory);
        createSpecificationService.execute({ name, description });
        return reply.status(201).send({ message: "Specification created" });
    });

    app.get("/", async (request, reply) => {
        const list = await specificationRepoitory.list();

        return list;
    });
}
