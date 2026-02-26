import { AuctionsDBRepository } from "../../domain/repository/AuctionsDBRepository.js";
import { Auction, AuctionSchema } from "../../domain/models/Auction.js";
import { ConnectionMySQL } from "../../../core/DBConection.js";
import { RowDataPacket } from "mysql2";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../shared/types.js";

@injectable()
export class AbstractAuctionsMySQLRepository
  implements AuctionsDBRepository
{
  protected connection: ConnectionMySQL;

    constructor(
        @inject(TYPES.ConnectionMySQL)
        connection: ConnectionMySQL
    ) {
        if (connection.err) {
        throw new Error(connection.err);
        }
        this.connection = connection;
    }

  async createAuction(auction: Auction): Promise<Auction> {
    const validatedAuction = AuctionSchema.omit({
      id: true,
      created_at: true,
      status: true
    }).parse(auction);

    const result = await this.connection.execPreparedQuery(
      `INSERT INTO auctions (title, current_price, end_time, user_id)
       VALUES (?, ?, ?, ?)`,
      [
        validatedAuction.title,
        validatedAuction.current_price,
        validatedAuction.end_time,
        validatedAuction.user_id
      ]
    );

    const insertedID = result.insertId;

    return await this.getAuctionByID(insertedID);
  }

  async getAllAuctions(): Promise<Auction[]> {
    const rows = await this.connection.fetchRows<RowDataPacket[]>(
      `SELECT id, title, current_price, end_time, status, created_at, user_id 
       FROM auctions`,
      []
    );

    return rows.map(row => AuctionSchema.parse(row));
  }

  async getAuctionByID(id: number): Promise<Auction> {
    const rows = await this.connection.fetchRows<RowDataPacket[]>(
      `SELECT id, title, current_price, end_time, status, created_at, user_id
       FROM auctions
       WHERE id = ?`,
      [id]
    );

    if (rows.length === 0) {
      throw new Error("Subasta no encontrada");
    }

    return AuctionSchema.parse(rows[0]);
  }

    async setAuctionStatus(id: number, status: boolean): Promise<Auction> {

        await this.connection.execPreparedQuery(
            "UPDATE auctions SET status = ? WHERE id = ?",
            [status, id]
        );

        return await this.getAuctionByID(id);
    }

  async setAuctionCurrentPrice(id: number, price: number): Promise<void> {
    const result = await this.connection.execPreparedQuery(
      `UPDATE auctions
       SET current_price = ?
       WHERE id = ?`,
      [price, id]
    );

    if (result.affectedRows === 0) {
      throw new Error("Subasta no encontrada");
    }
  }
}