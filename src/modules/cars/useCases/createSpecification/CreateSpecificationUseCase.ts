import { inject, injectable } from "tsyringe";
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
            throw new Error("Specification alredy exist!");
        }
        await this.specificationRepository.create({ name, description });
    }
}
