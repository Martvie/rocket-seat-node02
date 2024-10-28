import { v4 as uuidv4 } from "uuid";
import { ICarsCreation } from "../../interfaces/cars";

export class Car implements ICarsCreation {
    constructor({ brand, category_id, daily_rate, description, fine_amount, license_plate, name }: ICarsCreation) {
        this.id = uuidv4();
        this.created_at = new Date();
        this.name = name;
        this.description = description;
        this.brand = brand;
        this.category_id = category_id;
        this.daily_rate = daily_rate;
        this.fine_amount = fine_amount;
        this.license_plate = license_plate;
    }

    id: string;
    created_at: Date;
    name: string;
    description: string;
    brand: string;
    category_id: string;
    daily_rate: number;
    fine_amount: number;
    license_plate: string;
}
