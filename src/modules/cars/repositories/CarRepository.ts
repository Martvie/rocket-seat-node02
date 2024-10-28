import { ICarsCreation, ICarsRepository } from "../../../interfaces/cars";

export class CarRepository implements ICarsRepository {
    execute({}: ICarsCreation): Promise<void> {}
}
