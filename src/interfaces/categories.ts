export interface ICategoryCreation {
    name: string;
    description: string;
}

export interface ICategory extends ICategoryCreation {
    id: string;
    created_at: Date;
}
