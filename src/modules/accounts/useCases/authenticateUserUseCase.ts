import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../errors/appError";
import { IUserRepository } from "../../../interfaces/user";

export interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
}

@injectable()
export class AuthenticateUser {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Email or password incorrect!", 401);
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Email or password incorrect!", 401);
        }

        const token = sign({}, "466023d34228639a07959459dfcda8b7", {
            subject: user.id,
            expiresIn: "1d",
        });

        const tokenReturn: IResponse = { user: { name: user.name, email: user.email }, token };

        return tokenReturn;
    }
}
