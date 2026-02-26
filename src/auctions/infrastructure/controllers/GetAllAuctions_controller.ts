import type { Request, Response } from "express";
import { GetAllAuctionsUseCase } from "../../application/GetAllAuctions_useCase.js";
import { controller, httpGet } from "inversify-express-utils";
import { inject } from "inversify";
import { TYPES } from "../../../shared/types.js";

@controller("/auctions")
export class GetAllAuctionsController {

    private uc: GetAllAuctionsUseCase;

    constructor(
        @inject(TYPES.GetAllAuctionsUseCase)
        uc: GetAllAuctionsUseCase
    ) {
        this.uc = uc;
        this.handle = this.handle.bind(this);
    }

    @httpGet("/")
    async handle(req: Request, res: Response): Promise<Response> {
        try {

            const auctions = await this.uc.execute();

            return res.status(200).json({
                message: "Subastas obtenidas correctamente",
                auctions
            });

        } catch (error: any) {
            return res.status(404).json({
                error: error.message
            });
        }
    }
}