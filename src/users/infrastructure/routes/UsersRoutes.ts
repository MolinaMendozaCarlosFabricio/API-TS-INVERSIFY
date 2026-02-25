import { Router } from "express";
import { DeleteUserController } from "../controllers/DeleteUser_controller.js";
import { GetUserByIDController } from "../controllers/GetUserByID_controller.js";
import { RegisterUserController } from "../controllers/RegisterUser_controller.js";
import { UpdateUserController } from "../controllers/UpdateUser_controller.js";

export const UserRoutes = (
    registerUserController: RegisterUserController,
    getUserByIDController: GetUserByIDController,
    updateUserController: UpdateUserController,
    deleteUserController: DeleteUserController,
) => {
    const UsersRouter = Router();
    
    UsersRouter.post("/", registerUserController.handle);
    UsersRouter.get("/:id", getUserByIDController.handle);
    UsersRouter.put("/:id", updateUserController.handle);
    UsersRouter.delete("/:id", deleteUserController.handle);

    return UsersRouter;
}