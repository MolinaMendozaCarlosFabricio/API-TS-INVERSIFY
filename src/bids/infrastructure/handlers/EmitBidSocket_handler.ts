import { Socket } from "socket.io";
import { container } from "../../../shared/container.js";
import { TYPES } from "../../../shared/types.js";
import { PlaceBidUseCase } from "../../application/EmitBid_useCase.js";

export const bidsSocketHandler = (socket: Socket) => {

    const placeBidUseCase = container.get<PlaceBidUseCase>(
        TYPES.EmitBidUseCase
    );

    socket.on("place_bid", async (data) => {

        try {

            const { auction_id, user_id, amount } = data;

            await placeBidUseCase.execute({
                id: 0,
                auction_id,
                user_id,
                amount,
                created_at: ""
            });

            socket.emit("bid_success", {
                message: "Puja realizada correctamente"
            });
        } catch (error: any) {
            socket.emit("bid_error", {
                error: error.message
            });
        }
    });

};