import { AppError } from "../errors/appError";
import { IUserCreation } from "../interfaces/user";
import { AuthenticateUser } from "../modules/accounts/useCases/authenticateUserUseCase";
import { UserUseCase } from "../modules/accounts/useCases/userUseCases";
import { UserRepositoryInMemory } from "./inmemory/UserRepositoryInMemory";

let userRepositoryInMemory: UserRepositoryInMemory;
let autenticateUserUseCase: AuthenticateUser;
let userUseCase: UserUseCase;

describe("Authenticate User", () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        autenticateUserUseCase = new AuthenticateUser(userRepositoryInMemory);
        userUseCase = new UserUseCase(userRepositoryInMemory);
    });

    it("should be able to authenticate a user", async () => {
        const user: IUserCreation = {
            drive_license: "0000123",
            email: "user@email.com",
            name: "jorginho",
            password: "1234",
        };

        await userUseCase.create(user);

        const result = await autenticateUserUseCase.execute({ email: user.email, password: user.password });

        expect(result).toHaveProperty("user");
    });

    it("should NOT be able to authenticate a non-existent user.", async () => {
        expect(async () => {
            await autenticateUserUseCase.execute({ email: "user@email.com", password: "password" });
        }).rejects.toBeInstanceOf(AppError);
    });
    it("should NOT be able to authenticate with a wrong password.", () => {
        expect(async () => {
            const user: IUserCreation = {
                drive_license: "0000123",
                email: "user@email.com",
                name: "jorginho",
                password: "1234",
            };

            await userUseCase.create(user);
            await autenticateUserUseCase.execute({ email: "user@email.com", password: "wrong password" });
        }).rejects.toBeInstanceOf(AppError);
    });
});
