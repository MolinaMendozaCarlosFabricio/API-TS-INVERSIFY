import { inject, injectable } from "inversify";
import type { UsersDBRepository } from "../domain/repository/UsersDBRepository.js";
import { TYPES } from "../../shared/types.js";

@injectable()
export class DeleteUserUseCase {
    repo!: UsersDBRepository;
    constructor(
        @inject(TYPES.UsersDBRepository)
        repo: UsersDBRepository
    ) {
        this.repo = repo;
    }
    async execute(id: number): Promise<void> {
        if (id <= 0) {
            throw new Error("ID inválido");
        }

        await this.repo.deleteUser(id);
    }
}