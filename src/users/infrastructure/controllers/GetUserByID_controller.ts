import { controller, httpGet } from "inversify-express-utils";
import { GetUserByIDUseCase } from "../../application/GetUserByID_useCase.js";
import type { Request, Response } from "express";
import { inject } from "inversify";
import { TYPES } from "../../../shared/types.js";

@controller("/users")
export class GetUserByIDController {
    uc!: GetUserByIDUseCase;
    constructor(
        @inject(TYPES.GetUserByIDUseCase)
        uc: GetUserByIDUseCase
    ){
        this.uc = uc;
    }
    @httpGet("/:id")
    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);

            const user = await this.uc.execute(id);

            return res.status(200).json(user);
        } catch (error: any) {
            return res.status(404).json({
                error: error.message,
            });
        }
    }
}