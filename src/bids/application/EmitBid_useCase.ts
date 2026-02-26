import { inject, injectable } from "inversify";
import { TYPES } from "../../shared/types.js";
import type { BidsDBRepository } from "../domain/repository/BidsDBRepository.js";
import type { AuctionsDBRepository } from "../../auctions/domain/repository/AuctionsDBRepository.js";
import type { BidsSocketRepository } from "../domain/repository/BidsSocketRepository.js";
import { Bid } from "../domain/models/Bid.js";

@injectable()
export class PlaceBidUseCase {

    constructor(
        @inject(TYPES.BidsDBRepository)
        private readonly bidsRepo: BidsDBRepository,

        @inject(TYPES.AuctionsDBRepository)
        private readonly auctionsRepo: AuctionsDBRepository,

        @inject(TYPES.BidsSocketRepository)
        private readonly socketRepo: BidsSocketRepository
    ) {}

    async execute(bid: Bid): Promise<void> {

        const auction = await this.auctionsRepo.getAuctionByID(bid.auction_id);

        if (!auction.status) {
            throw new Error("La subasta está cerrada");
        }

        if (bid.amount <= auction.current_price) {
            throw new Error("La puja debe ser mayor al precio actual");
        }

        await this.bidsRepo.setBidInAAuction(bid);

        await this.auctionsRepo.setAuctionCurrentPrice(
            bid.auction_id,
            bid.amount
        );

        await this.socketRepo.emitBid(bid.auction_id, bid);
    }
}