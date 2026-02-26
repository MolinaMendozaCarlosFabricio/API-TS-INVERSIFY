import { Server } from "socket.io";
import { inject, injectable } from "inversify";
import { BidsSocketRepository } from "../../domain/repository/BidsSocketRepository.js";
import { Bid } from "../../domain/models/Bid.js";
import { TYPES } from "../../../shared/types.js";

@injectable()
export class BidsSocketAdapter implements BidsSocketRepository {

    constructor(
        @inject(TYPES.SocketIO)
        private readonly io: Server
    ) {}

    async emitBid(auction_id: number, payload: Bid): Promise<void> {

        console.log("Emitiendo nueva puja para subasta:", auction_id);

        this.io
            .to(`auction_${auction_id}`)
            .emit("new_bid", payload);
    }
}