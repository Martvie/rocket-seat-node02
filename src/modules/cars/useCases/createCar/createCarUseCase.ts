interface IRequest {
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
}

import { AppError } from "../../../../shared/errors/appError";

import { inject, injectable } from "tsyringe";
import { ICarsRepository } from "../../../../interfaces/cars";

@injectable()
export class CreateCarUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}
    async execute({ brand, category_id, daily_rate, description, fine_amount, license_plate, name }: IRequest): Promise<void> {
        const carAlredyExist = await this.carsRepository.findByName(name);

        if (carAlredyExist) {
            throw new AppError("Category Alredy exist!", 409);
        }
        await this.carsRepository.create({ brand, category_id, daily_rate, description, fine_amount, license_plate, name });
    }
}
