import { CategoryRepository } from "../../repositories/CategoryRepository";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

const categoryReporitory = new CategoryRepository();
export const importCategoryUseCase = new ImportCategoryUseCase(categoryReporitory);
export const importCategoryController = new ImportCategoryController(importCategoryUseCase);
