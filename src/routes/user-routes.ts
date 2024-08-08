import { FastifyInstance } from "fastify";
import { IUserCreation } from "../interfaces/user";
import { ensureAuthenticaded } from "../middlewares/ensureAuthenticated";
import { UserController } from "../modules/accounts/useCases/userController";

const userController = new UserController();

export async function userRoutes(app: FastifyInstance) {
    app.post<{ Body: IUserCreation }>("/", (request, reply) => {
        return userController.create(request, reply);
    });

    app.patch("/upload", { preHandler: ensureAuthenticaded }, (request, reply) => {
        return userController.updateAvatar(request, reply);
    });
}
