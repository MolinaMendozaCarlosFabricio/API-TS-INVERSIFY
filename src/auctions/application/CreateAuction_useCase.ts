import { inject, injectable } from "inversify";
import { Auction } from "../domain/models/Auction.js";
import type { AuctionsDBRepository } from "../domain/repository/AuctionsDBRepository.js";
import { TYPES } from "../../shared/types.js";

@injectable()
export class CreateAuctionUseCase {

    private repo: AuctionsDBRepository;

    constructor(
        @inject(TYPES.AuctionsDBRepository)
        repo: AuctionsDBRepository
    ) {
        this.repo = repo;
    }

    async execute(auction: Auction): Promise<Auction> {

        if (!auction.title) {
            throw new Error("El título es requerido");
        }

        if (auction.current_price <= 0) {
            throw new Error("El precio inicial debe ser mayor a 0");
        }

        if (!auction.end_time) {
            throw new Error("La fecha de finalización es requerida");
        }

        return await this.repo.createAuction(auction);
    }
}