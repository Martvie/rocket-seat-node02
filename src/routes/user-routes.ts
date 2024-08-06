import { FastifyInstance } from "fastify";
import { IUserCreation } from "../interfaces/user";
import { UserController } from "../modules/accounts/useCases/userController";

const userController = new UserController();

export async function userRoutes(app: FastifyInstance) {
    app.post<{ Body: IUserCreation }>("/", (request, reply) => {
        return userController.create(request, reply);
    });
}
