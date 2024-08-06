export interface ISpecificationCreation {
    name: string;
    description: string;
}

export interface ISpecification extends ISpecificationCreation {
    id: string;
    created_at: Date;
}

export interface ISpecificationRepository {
    create({ name, description }: ISpecificationCreation): Promise<void>;
    list(): Promise<ISpecification[]>;
    findByName(name: string): Promise<ISpecification | null>;
}
