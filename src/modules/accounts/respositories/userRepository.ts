import { IUser, IUserCreation, IUserRepository } from "../../../interfaces/user";
import { prisma } from "../../../lib/prisma";

export class UserRepository implements IUserRepository {
    async create(data: IUserCreation): Promise<void> {
        await prisma.user.create({
            data: data,
        });
    }

    async findByEmail(email: string): Promise<IUser | null> {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        return user;
    }
}
