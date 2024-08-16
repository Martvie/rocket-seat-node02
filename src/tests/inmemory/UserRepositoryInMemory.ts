import { IUser, IUserCreation, IUserRepository } from "../../interfaces/user";
import { User } from "../entities/User";

export class UserRepositoryInMemory implements IUserRepository {
    users: IUser[] = [];
    async create({ name, password, email, drive_license }: IUserCreation): Promise<void> {
        const user = new User({ name, password, email, drive_license });
        this.users.push(user);
    }

    async findByEmail(email: string): Promise<IUser> {
        const user = this.users.find((user) => user.email === email);
        return user!;
    }

    async findById(id: string): Promise<IUser> {
        const user = this.users.find((user) => user.id === id);
        return user!;
    }

    async updateAvatar(id: string, avatar: string): Promise<void> {}
}
