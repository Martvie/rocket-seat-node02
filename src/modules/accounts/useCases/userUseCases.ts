import { MultipartFile } from "@fastify/multipart";
import { hash } from "bcrypt";
import crypto from "crypto";
import path from "path";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../errors/appError";
import { IUserCreation, IUserRepository } from "../../../interfaces/user";
const fs = require("fs");
const util = require("util");
const { pipeline } = require("stream");
const pump = util.promisify(pipeline);

interface IRequest {
    user_id: string;
    avatarFile: MultipartFile | undefined;
}

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
            throw new AppError("User Alredy exist!", 409);
        }

        await this.userRepository.create({ name, email, password: passwordHash, drive_license });
    }

    async uploadAvatar({ user_id, avatarFile }: IRequest) {
        // console.log(user_id, avatarFile);

        const dirName = "./tmp";
        const fileHash = crypto.randomBytes(16).toString("hex");
        const filename = `${fileHash}-${avatarFile!.filename}`;
        fs.mkdirSync(dirName, { recursive: true });
        const saveHere = path.join(dirName, filename);
        await pump(avatarFile!.file, fs.createWriteStream(saveHere));
        await this.userRepository.updateAvatar(user_id, saveHere);
    }
}
