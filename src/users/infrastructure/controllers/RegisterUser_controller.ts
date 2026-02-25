import { inject } from "inversify";
import { RegisterUserUseCase } from "../../application/RegisterUser_useCase.js";
import type { Request, Response } from "express";
import { TYPES } from "../../../shared/types.js";
import { controller, httpPost } from "inversify-express-utils";

@controller("/users")
export class RegisterUserController {
    constructor(
        @inject(TYPES.RegisterUserUseCase)
        private readonly uc: RegisterUserUseCase
    ){}

    @httpPost("/")
    async handle(req: Request, res: Response): Promise<Response> {
        try {
            const { username, password } = req.body;

            await this.uc.execute({
                id: 0,
                username,
                password,
            });

            return res.status(201).json({
                message: "Usuario creado correctamente",
            });
        } catch (error: any) {
            return res.status(400).json({
                error: error.message,
            });
        }
    }
}