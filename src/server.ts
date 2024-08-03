import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastify, { FastifyInstance } from "fastify";
import { env } from "./env";
import { routes } from "./routes";

const app: FastifyInstance = fastify();

app.register(require("@fastify/multipart"));

const swaggerOptions = {
    openapi: {
        openapi: "3.0.0",
        swagger: {
            info: {
                title: "My Title",
                description: "My Description.",
                version: "1.0.0",
            },
            host: "localhost",
            schemes: ["http", "https"],
            consumes: ["application/json"],
            produces: ["application/json"],
            tags: [{ name: "Default", description: "Default" }],
        },
    },
};

const swaggerUiOptions = {
    routePrefix: "/docs",
    exposeRoute: true,
};

app.register(fastifySwagger, swaggerOptions);
app.register(fastifySwaggerUi, swaggerUiOptions);

app.register(routes);

app.listen({ port: 3333 }).then(() => {
    console.log(`Server running on http://localhost:${env.PORT}`);
});
