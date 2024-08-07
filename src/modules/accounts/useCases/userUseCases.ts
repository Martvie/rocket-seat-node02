import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { IUserCreation, IUserRepository } from "../../../interfaces/user";

@injectable()
export class UserUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ) {}

    async create({ name, email, password, drive_license }: IUserCreation): Promise<void> {
        const passwordHash = await hash(password, 8);
        const alredyExist = await this.userRepository.findByEmail(email);
        if (alredyExist) {
            throw new Error("User Alredy exist!");
        }

        await this.userRepository.create({ name, email, password: passwordHash, drive_license });
    }
}
