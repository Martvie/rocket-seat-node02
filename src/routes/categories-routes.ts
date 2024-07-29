import { FastifyInstance } from "fastify";
import { ICategoryCreation } from "../interfaces/categoris";

export async function categoriesRoutes(app: FastifyInstance) {
    app.post<{ Body: ICategoryCreation }>("/", async (request, reply) => {
        const { name, description } = request.body;

        return reply.status(201).send();
    });
}
