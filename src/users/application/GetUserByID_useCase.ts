import { inject, injectable } from "inversify";
import type { User } from "../domain/models/User.js";
import type { UsersDBRepository } from "../domain/repository/UsersDBRepository.js";
import { TYPES } from "../../shared/types.js";

@injectable()
export class GetUserByIDUseCase {
    repo!: UsersDBRepository;
    constructor(
        @inject(TYPES.UsersDBRepository)
        repo: UsersDBRepository
    ) {
        this.repo = repo;
    }
    async execute(id: number): Promise<User> {
        if (id <= 0) {
            throw new Error("ID inválido");
        }
        return await this.repo.getUserById(id);
    }
}