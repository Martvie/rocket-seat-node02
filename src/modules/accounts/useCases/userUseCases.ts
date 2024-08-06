import { inject, injectable } from "tsyringe";
import { IUserCreation, IUserRepository } from "../../../interfaces/user";

@injectable()
export class UserUseCase {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ) {}

    async create(data: IUserCreation): Promise<void> {
        const alredyExist = await this.userRepository.findByEmail(data.email);
        if (alredyExist) {
            throw new Error("User Alredy exist!");
        }

        await this.userRepository.create(data);
    }
}
