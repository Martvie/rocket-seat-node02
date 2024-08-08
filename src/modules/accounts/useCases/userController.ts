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

    async updateAvatar(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.user;
        const avatarFile = await request.file!();
        const userUseCase = container.resolve(UserUseCase);
        userUseCase.uploadAvatar({ user_id: id, avatarFile });

        return reply.status(204).send();
    }
}
