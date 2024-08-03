import { FastifyInstance } from "fastify";
import { ICategoryCreation } from "../interfaces/categories";
import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { importCategoryController } from "../modules/cars/useCases/importCategory";
import { listCategoryController } from "../modules/cars/useCases/listCategory";

export async function categoriesRoutes(app: FastifyInstance) {
    app.post<{ Body: ICategoryCreation }>(
        "/",
        {
            schema: {
                description: "Create a new category",
                tags: ["Category"],
                summary: "Creates category",
                body: { type: "object", properties: { name: { type: "string" }, description: { type: "string" } } },
                response: {
                    201: {
                        description: "Category created",
                        type: "null",
                    },
                    409: {
                        description: "Category alredy exist!",
                        type: "null",
                    },
                },
            },
        },
        async (request, reply) => {
            return createCategoryController.handle(request, reply);
        }
    );

    app.get(
        "/",
        {
            schema: {
                description: "List all the categories",
                tags: ["Category"],
                summary: "list categories",
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
            return listCategoryController.haddle(request, reply);
        }
    );

    app.post(
        "/upload",
        {
            schema: {
                description: "Upload a file to create many categories",
                tags: ["Category"],
                summary: "Create many categories",
                response: {
                    200: {
                        description: "Sucess",
                        type: "null",
                    },
                },
            },
        },
        async (request, reply) => {
            return importCategoryController.handle(request, reply);
        }
    );
}
