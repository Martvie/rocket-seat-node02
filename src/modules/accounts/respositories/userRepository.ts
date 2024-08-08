import { IUser, IUserCreation, IUserRepository } from "../../../interfaces/user";
import { prisma } from "../../../lib/prisma";
import { deleteFile } from "../../../utils/file";

export class UserRepository implements IUserRepository {
    async create(data: IUserCreation): Promise<void> {
        await prisma.user.create({
            data: data,
        });
    }

    async findByEmail(email: string): Promise<IUser> {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        return user!;
    }

    async findById(id: string): Promise<IUser> {
        const user = await prisma.user.findUnique({
            where: { id },
        });

        return user!;
    }

    async updateAvatar(id: string, avatar: string): Promise<void> {
        const user = await this.findById(id);

        if (user.avatar) {
            await deleteFile(user.avatar);
        }

        await prisma.user.update({
            where: { id },
            data: { avatar: avatar },
        });
    }
}
