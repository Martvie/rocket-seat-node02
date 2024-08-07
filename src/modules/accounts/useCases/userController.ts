import { FastifyReply, FastifyRequest } from "fastify";
import { container } from "tsyringe";
import { IUserCreation } from "../../../interfaces/user";
import { UserUseCase } from "./userUseCases";

export class UserController {
    async create(request: FastifyRequest<{ Body: IUserCreation }>, reply: FastifyReply) {
        const { name, email, drive_license, password } = request.body;
        const userUseCase = container.resolve(UserUseCase);
        await userUseCase.create({ name, email, password, drive_license });
        return reply.status(201).send({ message: "User Created" });
    }
}
