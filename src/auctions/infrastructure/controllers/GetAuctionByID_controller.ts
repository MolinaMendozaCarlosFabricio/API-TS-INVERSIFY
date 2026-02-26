import type { Request, Response } from "express";
import { GetAuctionByIDUseCase } from "../../application/GetAuctionByID_useCase.js";
import { controller, httpGet } from "inversify-express-utils";
import { inject } from "inversify";
import { TYPES } from "../../../shared/types.js";

@controller("/auctions")
export class GetAuctionByIDController {

    private uc: GetAuctionByIDUseCase;

    constructor(
        @inject(TYPES.GetAuctionByIDUseCase)
        uc: GetAuctionByIDUseCase
    ) {
        this.uc = uc;
        this.handle = this.handle.bind(this);
    }

    @httpGet("/:id")
    async handle(req: Request, res: Response): Promise<Response> {
        try {

            const id = Number(req.params.id);

            const auction = await this.uc.execute(id);

            return res.status(200).json({
                message: "Subasta obtenida correctamente",
                auction
            });

        } catch (error: any) {
            return res.status(404).json({
                error: error.message
            });
        }
    }
}