import { inject, injectable } from "inversify";
import type { User } from "../domain/models/User.js";
import type { UsersDBRepository } from "../domain/repository/UsersDBRepository.ts";
import { TYPES } from "../../shared/types.js";

@injectable()
export class RegisterUserUseCase {
    constructor(
        @inject(TYPES.UsersDBRepository)
        private readonly repo: UsersDBRepository
    ){}

    async execute(user: User): Promise<void> {
        if (!user.username || !user.password) {
            throw new Error("Username y password son requeridos");
        }
        await this.repo.createUser(user);
    }
}