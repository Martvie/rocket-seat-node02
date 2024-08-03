import { FastifyInstance } from "fastify";
import { ICategoryCreation } from "../interfaces/categories";
import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { importCategoryController } from "../modules/cars/useCases/importCategory";
import { listCategoryController } from "../modules/cars/useCases/listCategory";

export async function categoriesRoutes(app: FastifyInstance) {
    app.post<{ Body: ICategoryCreation }>("/", async (request, reply) => {
        return createCategoryController.handle(request, reply);
    });

    app.get("/", async (request, reply) => {
        return listCategoryController.haddle(request, reply);
    });

    app.post("/upload", async (request, reply) => {
        return importCategoryController.handle(request, reply);
    });
}
