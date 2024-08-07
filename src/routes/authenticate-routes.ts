import { FastifyInstance } from "fastify";
import { AuthenticateController } from "../modules/accounts/useCases/authenticaceController";
import { IRequest } from "../modules/accounts/useCases/authenticateUserUseCase";

const autenthicateUserController = new AuthenticateController();

export async function authenticateRoutes(app: FastifyInstance) {
    app.post<{ Body: IRequest }>("/sessions", (request, reply) => {
        return autenthicateUserController.authenticate(request, reply);
    });
}
