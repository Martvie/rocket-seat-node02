import { FastifyInstance } from "fastify";
import { ISpecificationCreation } from "../interfaces/specification";
import { SpecificationRepository } from "../modules/cars/repositories/SpecificationRepository";
import { createSpecificationController } from "../modules/cars/useCases/createSpecification";

const specificationRepoitory = new SpecificationRepository();

export async function specificationRoutes(app: FastifyInstance) {
    app.post<{ Body: ISpecificationCreation }>("/", (request, reply) => {
        return createSpecificationController.handle(request, reply);
    });

    app.get("/", async (request, reply) => {
        const list = await specificationRepoitory.list();

        return list;
    });
}
