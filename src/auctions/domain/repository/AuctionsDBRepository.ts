import { Auction } from "../models/Auction.js";

export interface AuctionsDBRepository {
    createAuction(auction: Auction): Promise<Auction>
    getAllAuctions(): Promise<Auction[]>
    getAuctionByID(id: number): Promise<Auction>
    setAuctionStatus(id: number, status: boolean): Promise<Auction>;
    // setAuctionCurrentPrice(id: number, price: number): Promise<void>
}