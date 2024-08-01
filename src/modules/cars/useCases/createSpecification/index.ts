import { SpecificationRepository } from "../../repositories/SpecificationRepository";
import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

const specificationRepoitory = new SpecificationRepository();

const createSpecificationUseCase = new CreateSpecificationUseCase(specificationRepoitory);

export const createSpecificationController = new CreateSpecificationController(createSpecificationUseCase);
