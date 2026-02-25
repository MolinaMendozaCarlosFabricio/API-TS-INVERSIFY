import { inject, injectable } from "inversify";
import type { User } from "../domain/models/User.js";
import type { UsersDBRepository } from "../domain/repository/UsersDBRepository.js";
import { TYPES } from "../../shared/types.js";

@injectable()
export class UpdateUserUseCase {
    repo!: UsersDBRepository
    constructor(
        @inject(TYPES.UsersDBRepository)
        repo: UsersDBRepository
    ){
        this.repo = repo;
    }
    async execute(user: User): Promise<void> {
        if (!user.id || user.id <= 0) {
          throw new Error("ID inválido");
        }

        await this.repo.editUser(user);
    }
}