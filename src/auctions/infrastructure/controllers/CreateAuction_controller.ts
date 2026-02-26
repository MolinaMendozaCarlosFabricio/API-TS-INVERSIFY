import type { Request, Response } from "express";
import { CreateAuctionUseCase } from "../../application/CreateAuction_useCase.js";
import { controller, httpPost } from "inversify-express-utils";
import { inject } from "inversify";
import { TYPES } from "../../../shared/types.js";

@controller("/auctions")
export class CreateAuctionController {

    private uc: CreateAuctionUseCase;

    constructor(
        @inject(TYPES.CreateAuctionUseCase)
        uc: CreateAuctionUseCase
    ) {
        this.uc = uc;
        this.handle = this.handle.bind(this);
    }

    @httpPost("/")
    async handle(req: Request, res: Response): Promise<Response> {
        try {

            const { title, current_price, end_time, user_id } = req.body;

            const auction = await this.uc.execute({
                id: 0,
                title,
                current_price: Number(current_price),
                end_time,
                status: true,
                created_at: "",
                user_id
            });

            return res.status(201).json({
                message: "Subasta creada correctamente",
                auction
            });

        } catch (error: any) {
            return res.status(400).json({
                error: error.message
            });
        }
    }
}