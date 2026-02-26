import { Bid } from "../models/Bid.js";

export interface BidsDBRepository {
    getBidsByAuction(auction_id: number): Promise<Bid[]>
    setBidInAAuction(bid: Bid): Promise<void>
}