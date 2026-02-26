import type { Request, Response } from "express";
import { controller, httpGet } from "inversify-express-utils";
import { inject } from "inversify";
import { GetBidsByAuctionUseCase } from "../../application/GetBidsByAuction_useCase.js";
import { TYPES } from "../../../shared/types.js";

@controller("/auctions")
export class GetBidsByAuctionController {

    constructor(
        @inject(TYPES.GetBidsByAuctionUseCase)
        private readonly uc: GetBidsByAuctionUseCase
    ) {}

    @httpGet("/:id/bids")
    async handle(req: Request, res: Response): Promise<Response> {
        try {

            const auction_id = Number(req.params.id);

            const bids = await this.uc.execute(auction_id);

            return res.status(200).json({
                message: "Pujas obtenidas correctamente",
                bids
            });

        } catch (error: any) {
            return res.status(400).json({
                error: error.message
            });
        }
    }
}