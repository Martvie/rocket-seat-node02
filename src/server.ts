import fastify, { FastifyInstance } from "fastify";
import { env } from "./env";
import { routes } from "./routes";

const app: FastifyInstance = fastify();

app.register(require("@fastify/multipart"));

app.register(routes);

app.listen({ port: 3333 }).then(() => {
    console.log(`Server running on http://localhost:${env.PORT}`);
});
