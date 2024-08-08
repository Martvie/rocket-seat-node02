export interface IUserCreation {
    name: string;
    password: string;
    email: string;
    drive_license: string;
}

export interface IUser extends IUserCreation {
    id: string;
    admin: boolean;
    created_at: Date;
    avatar: string | null;
}

export interface IUserRepository {
    create({ name, password, email, drive_license }: IUserCreation): Promise<void>;
    findByEmail(email: string): Promise<IUser>;
    findById(id: string): Promise<IUser>;
    updateAvatar(id: string, avatar: string): Promise<void>;
}
