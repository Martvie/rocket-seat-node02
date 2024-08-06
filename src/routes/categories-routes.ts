import { FastifyInstance } from "fastify";
import { ICategoryCreation } from "../interfaces/categories";
import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "../modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoryController } from "../modules/cars/useCases/listCategory/ListCategoryController";

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoryController = new ListCategoryController();

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
                        type: "object",
                        properties: { message: { type: "string" } },
                    },
                    409: {
                        description: "Category alredy exist!",
                        type: "null",
                    },
                },
            },
        },
        (request, reply) => {
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
        (request, reply) => {
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
                consumes: ["multipart/form-data"],
                body: {
                    type: "object",
                    properties: {
                        file: { type: "string", format: "binary" },
                    },
                },
                response: {
                    200: {
                        description: "Sucess",
                        type: "null",
                    },
                },
            },
        },
        (request, reply) => {
            return importCategoryController.handle(request, reply);
        }
    );
}
