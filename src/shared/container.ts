import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types.js";

import { ConnectionMySQL } from "../core/DBConection.js";
import type { UsersDBRepository } from "../users/domain/repository/UsersDBRepository.js";
import { AbstractUsersMySQLRepository } from "../users/infrastructure/adapters/MySQLUsersImpl.js";
import { RegisterUserUseCase } from "../users/application/RegisterUser_useCase.js";
import { RegisterUserController } from "../users/infrastructure/controllers/RegisterUser_controller.js";
import { GetUserByIDUseCase } from "../users/application/GetUserByID_useCase.js";
import { GetUserByIDController } from "../users/infrastructure/controllers/GetUserByID_controller.js";
import { UpdateUserUseCase } from "../users/application/UpdateUser_useCase.js";
import { UpdateUserController } from "../users/infrastructure/controllers/UpdateUser_controller.js";
import { DeleteUserUseCase } from "../users/application/DeleteUser_useCase.js";
import { DeleteUserController } from "../users/infrastructure/controllers/DeleteUser_controller.js";
import { LogInUserUseCase } from "../users/application/LogInUser_useCase.js";
import { LogInUserController } from "../users/infrastructure/controllers/LogInUser_controller.js";

export const container = new Container();

const connection = await ConnectionMySQL.createConnection();

// Conexión a la base de datos
container.bind<ConnectionMySQL>(TYPES.ConnectionMySQL)
  .toConstantValue(connection);

// Implementación del repositorio de base de datos para usuarios
container.bind<UsersDBRepository>(TYPES.UsersDBRepository)
  .to(AbstractUsersMySQLRepository);

// Users Features -------------------------------------------------------------------------------
// RegisterUser
container.bind(TYPES.RegisterUserUseCase)
  .to(RegisterUserUseCase);

container.bind(TYPES.RegisterUserController)
  .to(RegisterUserController);

// LogIn
container.bind(TYPES.SignInUseCase)
  .to(LogInUserUseCase);

container.bind(TYPES.SignInController)
  .to(LogInUserController);

// GetUserByID
container.bind(TYPES.GetUserByIDUseCase)
  .to(GetUserByIDUseCase);

container.bind(TYPES.GetUserByIDController)
  .to(GetUserByIDController);

// UpdateUser
container.bind(TYPES.UpdateUserUseCase)
  .to(UpdateUserUseCase);

container.bind(TYPES.GetUserByIDController)
  .to(UpdateUserController);

// DeleteUser
container.bind(TYPES.DeleteUserUseCase)
  .to(DeleteUserUseCase);

container.bind(TYPES.DeleteUserController)
  .to(DeleteUserController);