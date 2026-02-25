import { controller, httpDelete } from "inversify-express-utils";
import { DeleteUserUseCase } from "../../application/DeleteUser_useCase.js";
import type { Request, Response } from "express";
import { inject } from "inversify";
import { TYPES } from "../../../shared/types.js";

@controller("/users")
export class DeleteUserController {
    uc!: DeleteUserUseCase;
    constructor(
        @inject(TYPES.DeleteUserUseCase)
        uc: DeleteUserUseCase
    ){
        this.uc = uc;
    }
    @httpDelete("/:id")
    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);

            await this.uc.execute(id);

            return res.status(200).json({
                message: "Usuario eliminado correctamente",
            });
        } catch (error: any) {
            return res.status(404).json({
                error: error.message,
            });
        }
    }
}