export interface IUserCreation {
    name: string;
    password: string;
    email: string;
    drive_license: string;
}

export interface IUser extends IUserCreation {
    id: string;
    created_at: Date;
}

export interface IUserRepository {
    create({ name, password, email, drive_license }: IUserCreation): Promise<void>;
    findByEmail(email: string): Promise<IUser | null>;
    findById(id: string): Promise<IUser | null>;
}
