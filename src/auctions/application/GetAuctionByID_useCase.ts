import type { AuctionsDBRepository } from "../domain/repository/AuctionsDBRepository.js";
import { Auction } from "../domain/models/Auction.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../../shared/types.js";

@injectable()
export class GetAuctionByIDUseCase {

    private repo: AuctionsDBRepository;

    constructor(
        @inject(TYPES.AuctionsDBRepository)
        repo: AuctionsDBRepository
    ) {
        this.repo = repo;
    }

    async execute(id: number): Promise<Auction> {

        if (!id || id <= 0) {
            throw new Error("ID inválido");
        }

        return await this.repo.getAuctionByID(id);
    }
}