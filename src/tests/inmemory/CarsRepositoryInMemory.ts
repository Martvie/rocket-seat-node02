import { ICarsCreation, ICarsRepository } from "../../interfaces/cars";
import { Car } from "../entities/Car";

export class CarsRepostioryInMemory implements ICarsRepository {
    cars: Car[] = [];
    async create({ brand, category_id, daily_rate, description, fine_amount, license_plate, name }: ICarsCreation): Promise<void> {
        const car = new Car({ brand, category_id, daily_rate, description, fine_amount, license_plate, name });
        this.cars.push(car);
    }

    async findByName(name: String): Promise<ICarsCreation> {
        const car = this.cars.find((cars) => cars.name === name);
        return car!;
    }
}
