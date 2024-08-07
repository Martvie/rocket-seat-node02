import { FastifyReply, FastifyRequest } from "fastify";
import { container } from "tsyringe";
import { AuthenticateUser, IRequest } from "./authenticateUserUseCase";

export class AuthenticateController {
    async authenticate(request: FastifyRequest<{ Body: IRequest }>, reply: FastifyReply) {
        const { password, email } = request.body;
        const authenticateUserUseCase = container.resolve(AuthenticateUser);
        const authenticateInfo = await authenticateUserUseCase.execute({ email, password });
        return reply.send(authenticateInfo);
    }
}
