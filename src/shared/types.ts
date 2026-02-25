export const TYPES = {
    // Conector de MySQL
    ConnectionMySQL: Symbol.for("ConnectionMySQL"),
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
};