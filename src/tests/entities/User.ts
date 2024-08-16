import { v4 as uuidv4 } from "uuid";
import { IUser, IUserCreation } from "../../interfaces/user";

export class User implements IUser {
    constructor({ name, password, email, drive_license }: IUserCreation) {
        this.name = name;
        this.id = uuidv4();
        this.created_at = new Date();
        this.password = password;
        this.email = email;
        this.drive_license = drive_license;
        this.admin = false;
        this.avatar = "";
    }
    admin: boolean;
    avatar: string | null;
    created_at: Date;
    drive_license: string;
    email: string;
    id: string;
    name: string;
    password: string;
}
