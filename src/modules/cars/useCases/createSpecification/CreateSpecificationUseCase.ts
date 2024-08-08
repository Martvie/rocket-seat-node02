import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appError";
import { ISpecificationCreation, ISpecificationRepository } from "../../../../interfaces/specification";

@injectable()
export class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationRepository")
        private specificationRepository: ISpecificationRepository
    ) {}

    async execute({ name, description }: ISpecificationCreation): Promise<void> {
        const specificationAlredyExist = await this.specificationRepository.findByName(name);

        if (specificationAlredyExist) {
            throw new AppError("Specification alredy exist!", 409);
        }
        await this.specificationRepository.create({ name, description });
    }
}
