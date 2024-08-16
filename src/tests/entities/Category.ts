import { v4 as uuidv4 } from "uuid";
import { ICategory } from "../../interfaces/categories";

export class Category implements ICategory {
    constructor(name: string, description: string) {
        this.id = uuidv4();
        this.created_at = new Date();
        this.name = name;
        this.description = description;
    }

    id: string;
    created_at: Date;
    name: string;
    description: string;
}
