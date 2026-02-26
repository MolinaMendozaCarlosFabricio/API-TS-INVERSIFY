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
import { AuctionsDBRepository } from "../auctions/domain/repository/AuctionsDBRepository.js";
import { AbstractAuctionsMySQLRepository } from "../auctions/infrastructure/adapters/MySQLAuctionsImpl.js";
import { CreateAuctionUseCase } from "../auctions/application/CreateAuction_useCase.js";
import { CreateAuctionController } from "../auctions/infrastructure/controllers/CreateAuction_controller.js";
import { GetAllAuctionsUseCase } from "../auctions/application/GetAllAuctions_useCase.js";
import { GetAllAuctionsController } from "../auctions/infrastructure/controllers/GetAllAuctions_controller.js";
import { GetAuctionByIDController } from "../auctions/infrastructure/controllers/GetAuctionByID_controller.js";
import { GetAuctionByIDUseCase } from "../auctions/application/GetAuctionByID_useCase.js";
import { SetAuctionStatusUseCase } from "../auctions/application/SetAuctionStatus_useCase.js";
import { SetAuctionStatusController } from "../auctions/infrastructure/controllers/SetAuctionStatus_controller.js";

export const container = new Container();

const connection = await ConnectionMySQL.createConnection();

// Conexión a la base de datos
container.bind<ConnectionMySQL>(TYPES.ConnectionMySQL)
  .toConstantValue(connection);

// Implementación del repositorio de base de datos para usuarios
container.bind<UsersDBRepository>(TYPES.UsersDBRepository)
  .to(AbstractUsersMySQLRepository);

// Implementación del repositorio de base de datos para subastas
container.bind<AuctionsDBRepository>(TYPES.AuctionsDBRepository)
  .to(AbstractAuctionsMySQLRepository)

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

// Auctions features -------------------------------------------------------
// CreateAuction
container.bind(TYPES.CreateAuctionUseCase)
  .to(CreateAuctionUseCase)

container.bind(TYPES.CreateAuctionController)
  .to(CreateAuctionController)

// GetAllAuctions
container.bind(TYPES.GetAllAuctionsUseCase)
  .to(GetAllAuctionsUseCase)

container.bind(TYPES.GetAllAuctionsController)
  .to(GetAllAuctionsController)

// GetAuctionByID
container.bind(TYPES.GetAuctionByIDUseCase)
  .to(GetAuctionByIDUseCase)

container.bind(TYPES.GetAuctionByIDController)
  .to(GetAuctionByIDController)

// SetAuctionStatus
container.bind(TYPES.SetAuctionStatusUseCase)
  .to(SetAuctionStatusUseCase)

container.bind(TYPES.SetAuctionStatusController)
  .to(SetAuctionStatusController)