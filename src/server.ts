import fastify from "fastify";
import { env } from "./env";
import { categoriesRoutes } from "./routes/categories-routes";
import { specificationRoutes } from "./routes/specification-routes";

const app = fastify();

app.register(categoriesRoutes, { prefix: "/categories" });
app.register(specificationRoutes, { prefix: "/specification" });

app.listen({ port: 3333 }).then(() => {
    console.log(`Server running on http://localhost:${env.PORT}`);
});
