import { Bid } from "../models/Bid.js";

export interface BidsSocketRepository {
    emitBid(auction_id: number, payload: Bid): Promise<void>
}