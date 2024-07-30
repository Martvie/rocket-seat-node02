import { FastifyInstance } from "fastify";
import { ICategoryCreation } from "../interfaces/categories";
import { CategoryRepository } from "../repositories/CategoryRepository";

const categoryRepository = new CategoryRepository();

export async function categoriesRoutes(app: FastifyInstance) {
    app.post<{ Body: ICategoryCreation }>("/", async (request, reply) => {
        const { name, description } = request.body;

        const categoryAlredyExist = await categoryRepository.fingByName(name);

        if (categoryAlredyExist) {
            return reply.status(409).send({ message: "Category alredy exist!" });
        }

        categoryRepository.create({ name, description });

        return reply.status(201).send({ message: "Category created" });
    });

    app.get("/", async (request, reply) => {
        const list = await categoryRepository.list();

        return reply.status(200).send(list);
    });
}
