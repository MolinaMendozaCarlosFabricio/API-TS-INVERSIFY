import type { Request, Response } from "express";
import { SetAuctionStatusUseCase } from "../../application/SetAuctionStatus_useCase.js";
import { controller, httpPatch } from "inversify-express-utils";
import { inject } from "inversify";
import { TYPES } from "../../../shared/types.js";

@controller("/auctions")
export class SetAuctionStatusController {

    private uc: SetAuctionStatusUseCase;

    constructor(
        @inject(TYPES.SetAuctionStatusUseCase)
        uc: SetAuctionStatusUseCase
    ) {
        this.uc = uc;
        this.handle = this.handle.bind(this);
    }

    @httpPatch("/:id")
    async handle(req: Request, res: Response): Promise<Response> {
        try {

            const id = Number(req.params.id);
            const { status } = req.body;

            const updatedAuction = await this.uc.execute(id, status);

            return res.status(200).json({
                message: "Estado actualizado correctamente",
                auction: updatedAuction
            });

        } catch (error: any) {
            return res.status(400).json({
                error: error.message
            });
        }
    }
}