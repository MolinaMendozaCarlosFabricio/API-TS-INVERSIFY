import { inject, injectable } from "inversify";
import { BidsDBRepository } from "../../domain/repository/BidsDBRepository.js";
import { Bid, BidSchema } from "../../domain/models/Bid.js";
import { TYPES } from "../../../shared/types.js";
import type { ConnectionMySQL } from "../../../core/DBConection.js";
import { RowDataPacket } from "mysql2";

@injectable()
export class BidsMySQLRepository implements BidsDBRepository {

    protected connection!: ConnectionMySQL

    constructor(
        @inject(TYPES.ConnectionMySQL)
        connection: ConnectionMySQL
    ) {
        this.connection = connection;
    }

    async getBidsByAuction(auction_id: number): Promise<Bid[]> {

        const rows = await this.connection.fetchRows<RowDataPacket[]>(
            `SELECT * FROM bids WHERE auction_id = ? ORDER BY amount DESC`,
            [auction_id]
        );

        return rows.map((row: any) =>
            BidSchema.parse(row)
        );
    }

    async setBidInAAuction(bid: Bid): Promise<void> {

        const validatedBid = BidSchema.omit({
            id: true,
            created_at: true
        }).parse(bid);

        await this.connection.execPreparedQuery(
            `INSERT INTO bids (auction_id, user_id, amount)
             VALUES (?, ?, ?)`,
            [
                validatedBid.auction_id,
                validatedBid.user_id,
                validatedBid.amount
            ]
        );
    }
}