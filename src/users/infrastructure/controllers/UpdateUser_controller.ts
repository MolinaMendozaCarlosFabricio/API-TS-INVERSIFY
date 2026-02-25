import { controller, httpPut } from "inversify-express-utils";
import { UpdateUserUseCase } from "../../application/UpdateUser_useCase.js";
import type { Request, Response } from "express";
import { inject } from "inversify";
import { TYPES } from "../../../shared/types.js";

@controller("/users")
export class UpdateUserController {
    uc!: UpdateUserUseCase;
    constructor(
        @inject(TYPES.UpdateUserUseCase)
        uc: UpdateUserUseCase
    ){
        this.uc = uc;
    }
    @httpPut("/:id")
    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            const { username, password } = req.body;

            await this.uc.execute({
                id,
                username,
                password,
            });

            return res.status(200).json({
                message: "Usuario actualizado correctamente",
            });
        } catch (error: any) {
            return res.status(400).json({
                error: error.message,
            });
        }
    }
}