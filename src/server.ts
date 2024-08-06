import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastify, { FastifyInstance } from "fastify";
import "reflect-metadata"; // tsyringe
import { env } from "./env";
import { routes } from "./routes";
import "./shared/container";

const app: FastifyInstance = fastify();

app.register(require("@fastify/multipart"), {
    preservePath: true,
});

const swaggerOptions = {
    openapi: {
        openapi: "3.0.0",
        swagger: {
            info: {
                title: "RentX",
                description: "Documentation for RentX App",
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
