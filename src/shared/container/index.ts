import { container } from "tsyringe";
import { ICategoryRepository } from "../../interfaces/categories";
import { ISpecificationRepository } from "../../interfaces/specification";
import { IUserRepository } from "../../interfaces/user";
import { UserRepository } from "../../modules/accounts/respositories/userRepository";
import { CategoryRepository } from "../../modules/cars/repositories/CategoryRepository";
import { SpecificationRepository } from "../../modules/cars/repositories/SpecificationRepository";

container.registerSingleton<ICategoryRepository>("CategoryRepository", CategoryRepository);
container.registerSingleton<ISpecificationRepository>("SpecificationRepository", SpecificationRepository);
container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
