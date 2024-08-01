import { FastifyInstance } from "fastify";
import { ICategoryCreation } from "../interfaces/categories";
import { CategoryRepository } from "../modules/cars/repositories/CategoryRepository";
import { CreateCategoryService } from "../modules/cars/services/CreateCategoryService";

const categoryRepository = new CategoryRepository();

export async function categoriesRoutes(app: FastifyInstance) {
    app.post<{ Body: ICategoryCreation }>("/", async (request, reply) => {
        const createCategoryService = new CreateCategoryService(categoryRepository);
        const { name, description } = request.body;
        createCategoryService.execute({ name, description });
        return reply.status(201).send({ message: "Category created" });
    });

    app.get("/", async (request, reply) => {
        const list = await categoryRepository.list();

        return reply.status(200).send(list);
    });
}
