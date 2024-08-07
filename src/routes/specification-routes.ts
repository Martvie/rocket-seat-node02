import { FastifyInstance } from "fastify";
import { ISpecificationCreation } from "../interfaces/specification";
import { ensureAuthenticaded } from "../middlewares/ensureAuthenticated";
import { SpecificationRepository } from "../modules/cars/repositories/SpecificationRepository";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationRepoitory = new SpecificationRepository();
const createSpecificationController = new CreateSpecificationController();

export async function specificationRoutes(app: FastifyInstance) {
    app.post<{ Body: ISpecificationCreation }>(
        "/",
        {
            preHandler: ensureAuthenticaded,
            schema: {
                description: "Create a new specification",
                tags: ["Specification"],
                summary: "Creates specification",
                body: { type: "object", properties: { name: { type: "string" }, description: { type: "string" } } },
                response: {
                    201: {
                        description: "Specification created",
                        type: "object",
                        properties: { message: { type: "string" } },
                    },
                    409: {
                        description: "Specification alredy exist!",
                        type: "null",
                    },
                },
            },
        },
        (request, reply) => {
            return createSpecificationController.handle(request, reply);
        }
    );

    app.get(
        "/",
        {
            schema: {
                description: "List all the specifications",
                tags: ["Specification"],
                summary: "list specifications",
                response: {
                    200: {
                        description: "Sucess",
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                id: { type: "string" },
                                name: { type: "string" },
                                description: { type: "string" },
                                date: { type: "string" },
                            },
                        },
                    },
                },
            },
        },
        async (request, reply) => {
            const list = await specificationRepoitory.list();

            return list;
        }
    );
}
