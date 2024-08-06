import { FastifyInstance } from "fastify";
import { categoriesRoutes } from "./categories-routes";
import { specificationRoutes } from "./specification-routes";
import { userRoutes } from "./user-routes";

export async function routes(app: FastifyInstance) {
    app.register(categoriesRoutes, { prefix: "/categories" });
    app.register(specificationRoutes, { prefix: "/specification" });
    app.register(userRoutes, { prefix: "/user" });
}
