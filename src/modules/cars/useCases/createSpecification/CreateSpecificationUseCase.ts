import { ISpecificationCreation, ISpecificationRepository } from "../../../../interfaces/specification";

export class CreateSpecificationUseCase {
    constructor(private specificationRepository: ISpecificationRepository) {}

    async execute({ name, description }: ISpecificationCreation) {
        const specificationAlredyExist = await this.specificationRepository.findByName(name);

        if (!specificationAlredyExist) {
            this.specificationRepository.create({ name, description });
        }

        return specificationAlredyExist;
    }
}
