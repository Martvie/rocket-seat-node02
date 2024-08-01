import { ISpecificationCreation, ISpecificationRepository } from "../../../interfaces/specification";

export class CreateSpecificationService {
    constructor(private specificationRepository: ISpecificationRepository) {}

    async execute({ name, description }: ISpecificationCreation) {
        try {
            const specificationAlredyExist = await this.specificationRepository.findByName(name);

            if (specificationAlredyExist) {
                throw new Error("Specification alredy exist!");
            }

            this.specificationRepository.create({ name, description });
        } catch (error) {
            console.log(error);
        }
    }
}
