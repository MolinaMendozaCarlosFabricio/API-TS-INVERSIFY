export const TYPES = {
    // Conector de MySQL
    ConnectionMySQL: Symbol.for("ConnectionMySQL"),
    // Users features ---------------------------------------------------------------
    // Interfaz de la DB
    UsersDBRepository: Symbol.for("UsersDBRepository"),
    // Feature: RegisterUser
    RegisterUserUseCase: Symbol.for("RegisterUserUseCase"),
    RegisterUserController: Symbol.for("RegisterUserController"),
    // Feature: SignIn
    SignInUseCase: Symbol.for("SignInUseCase"),
    SignInController: Symbol.for("SignInController"),
    // Feature: GetUserByID
    GetUserByIDUseCase: Symbol.for("GetUserByIDUseCase"),
    GetUserByIDController: Symbol.for("GetUserByIDController"),
    // Feature: UpdateUser
    UpdateUserUseCase: Symbol.for("UpdateUserUseCase"),
    UpdateUserController: Symbol.for("UpdateUserController"),
    // Feature: DeleteUser
    DeleteUserUseCase: Symbol.for("DeleteUserUseCase"),
    DeleteUserController: Symbol.for("DeleteUserController"),

    // Auctions features ------------------------------------------------------------
    // Interfaz de la DB
    AuctionsDBRepository: Symbol.for("AuctionsDBRepository"),
    // Feature: CreateAuction
    CreateAuctionUseCase: Symbol.for("CreateAuctionUseCase"),
    CreateAuctionController: Symbol.for("CreateAuctionController"),
    // Feature: GetAllAuctions
    GetAllAuctionsUseCase: Symbol.for("GetAllAuctionsUseCase"),
    GetAllAuctionsController: Symbol.for("GetAllAuctionsController"),
    // Feature: GetAuctionByID
    GetAuctionByIDUseCase: Symbol.for("GetAuctionByIDUseCase"),
    GetAuctionByIDController: Symbol.for("GetAuctionByIDController"),
    // Feature: SetAuctionStatus
    SetAuctionStatusUseCase: Symbol.for("SetAuctionStatusUseCase"),
    SetAuctionStatusController: Symbol.for("SetAuctionStatusController"),
    // Feature: SetAuctionCurrentPrice
    // SetAuctionCurrentPriceUseCase: Symbol.for("SetAuctionCurrentPriceUseCase"),
    // SetAuctionCurrentPriceController: Symbol.for("SetAuctionCurrentPriceController"),

    // Bids features ---------------------------------------------------------------
};