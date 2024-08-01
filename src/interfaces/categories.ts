export interface ICategoryCreation {
    name: string;
    description: string;
}

export interface ICategory extends ICategoryCreation {
    id: string;
    created_at: Date;
}

export interface ICategoryRepository {
    create({ name, description }: ICategoryCreation): Promise<ICategoryCreation>;
    list(): Promise<ICategory[]>;
    findByName(name: string): Promise<ICategory | null>;
}
