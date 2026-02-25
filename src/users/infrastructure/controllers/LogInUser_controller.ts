import type { Request, Response } from "express";
import { LogInUserUseCase } from "../../application/LogInUser_useCase.js";
import { inject } from "inversify";
import { TYPES } from "../../../shared/types.js";
import { controller, httpPost } from "inversify-express-utils";

@controller("/users")
export class LogInUserController {
    private uc: LogInUserUseCase;

    constructor(
        @inject(TYPES.SignInUseCase)
        uc: LogInUserUseCase
    ) {
        this.uc = uc;
    }
    @httpPost("/login")
    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const { username, password } = req.body;

            const user = await this.uc.execute(username, password);

            return res.status(200).json({
                message: "Login exitoso",
                user
            });

        } catch (error: any) {
            return res.status(401).json({
                error: error.message
            });
        }
    }
}