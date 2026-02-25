import type { UsersDBRepository } from "../domain/repository/UsersDBRepository.js";
import type { User } from "../domain/models/User.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../../shared/types.js";

@injectable()
export class LogInUserUseCase {
    private repo: UsersDBRepository;

    constructor(
        @inject(TYPES.UsersDBRepository)
        repo: UsersDBRepository
    ) {
        this.repo = repo;
    }

    async execute(username: string, password: string): Promise<User> {
        if (!username || !password) {
            throw new Error("Username y password son requeridos");
        }

        const user = await this.repo.getUserByUsername(username);

        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        if (user.password !== password) {
            throw new Error("Credenciales inválidas");
        }

        return user;
    }
}