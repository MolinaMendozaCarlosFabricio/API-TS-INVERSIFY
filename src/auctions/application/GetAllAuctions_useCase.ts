import type { AuctionsDBRepository } from "../domain/repository/AuctionsDBRepository.js";
import { Auction } from "../domain/models/Auction.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../../shared/types.js";

@injectable()
export class GetAllAuctionsUseCase {

    private repo: AuctionsDBRepository;

    constructor(
        @inject(TYPES.AuctionsDBRepository)
        repo: AuctionsDBRepository
    ) {
        this.repo = repo;
    }

    async execute(): Promise<Auction[]> {
        const auctions = await this.repo.getAllAuctions();

        if (auctions.length === 0) {
            throw new Error("No hay subastas disponibles");
        }

        return auctions;
    }
}