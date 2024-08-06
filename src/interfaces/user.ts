export interface IUserCreation {
    name: string;
    username: string;
    password: string;
    email: string;
    drive_license: string;
}

export interface IUser extends IUserCreation {
    id: string;
    created_at: Date;
}

export interface IUserRepository {
    create({ name, username, password, email, drive_license }: IUserCreation): Promise<void>;
    findByEmail(email: string): Promise<IUser | null>;
}
