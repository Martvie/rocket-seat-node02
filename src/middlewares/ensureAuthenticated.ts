import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/appError";
import { UserRepository } from "../modules/accounts/respositories/userRepository";

interface IPayload {
    iat: number;
    exp: number;
    sub: string;
}

export async function ensureAuthenticaded(request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError("Token Missing", 401);
    }
    const [, token] = authHeader!.split(" ");

    try {
        const { sub: user_id } = verify(token, "466023d34228639a07959459dfcda8b7") as IPayload;
        const userRepository = new UserRepository();
        const user = await userRepository.findById(user_id);
        if (!user) {
            throw new AppError("User does not exist!", 404);
        }
        request.user = {
            id: user_id,
        };
    } catch (err) {
        throw new AppError("Invalid token", 401);
    }
}
