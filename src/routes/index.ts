import { FastifyInstance } from "fastify";
import { categoriesRoutes } from "./categories-routes";
import { specificationRoutes } from "./specification-routes";

export async function routes(app: FastifyInstance) {
    app.register(categoriesRoutes, { prefix: "/categories" });
    app.register(specificationRoutes, { prefix: "/specification" });
}
