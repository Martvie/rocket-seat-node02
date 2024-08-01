import fastify from "fastify";
import multer from "fastify-multer";
import { env } from "./env";
import { routes } from "./routes";

const app = fastify();

export const upload = multer({ dest: "./tmp" });

app.register(multer.contentParser);

app.register(routes);

app.listen({ port: 3333 }).then(() => {
    console.log(`Server running on http://localhost:${env.PORT}`);
});
