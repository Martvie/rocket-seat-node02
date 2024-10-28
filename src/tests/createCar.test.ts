import { CreateCarUseCase } from "../modules/cars/useCases/createCar/createCarUseCase";
import { CarsRepostioryInMemory } from "./inmemory/CarsRepositoryInMemory";

let createCarUseCase: CreateCarUseCase;
let carsReporitory: CarsRepostioryInMemory;

describe("Create Car", () => {
    beforeEach(() => {
        carsReporitory = new CarsRepostioryInMemory();
        createCarUseCase = new CreateCarUseCase(carsReporitory);
    });

    it("Sould be able to create a new car", async () => {
        await createCarUseCase.execute({
            name: "name",
            description: "description test",
            daily_rate: 100,
            license_plate: "abc-123",
            fine_amount: 100,
            brand: "brand",
            category_id: "abc",
        });

        const car = await carsReporitory.findByName("name");

        expect(car).toHaveProperty("id");
    });
});
