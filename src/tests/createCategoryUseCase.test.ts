import { AppError } from "../errors/appError";
import { CreateCategoryUseCase } from "../modules/cars/useCases/createCategory/CreateCategoryUseCase";
import { CategoryRepositoryInMemory } from "./inmemory/CategoryRepositoryInMemory";

let createCategory: CreateCategoryUseCase;
let categoryRepository: CategoryRepositoryInMemory;

describe("Create Category", () => {
    beforeEach(() => {
        categoryRepository = new CategoryRepositoryInMemory();
        createCategory = new CreateCategoryUseCase(categoryRepository);
    });

    it("should Be able to create a category", async () => {
        const category = { name: "CategoryTest", description: "Description test" };

        await createCategory.execute(category);

        const response = await categoryRepository.findByName(category.name);

        expect(response).toHaveProperty("id");
    });

    it("should NOT Be able to create a category if alredy exist", async () => {
        expect(async () => {
            const category = { name: "CategoryTest", description: "Description test" };

            await createCategory.execute(category);
            await createCategory.execute(category);
        }).rejects.toBeInstanceOf(AppError);
    });
});
