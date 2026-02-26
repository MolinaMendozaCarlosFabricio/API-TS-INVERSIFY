import { inject, injectable } from "inversify";
import type { BidsDBRepository } from "../domain/repository/BidsDBRepository.js";
import { Bid } from "../domain/models/Bid.js";
import { TYPES } from "../../shared/types.js";

@injectable()
export class GetBidsByAuctionUseCase {

    constructor(
        @inject(TYPES.BidsDBRepository)
        private readonly repo: BidsDBRepository
    ) {}

    async execute(auction_id: number): Promise<Bid[]> {

        if (!auction_id || auction_id <= 0) {
            throw new Error("ID de subasta inválido");
        }

        return await this.repo.getBidsByAuction(auction_id);
    }
}