import type { User } from "../models/User.js";

export interface UsersDBRepository {
    createUser(user: User): Promise<void>
    getUserByUsername(username: string): Promise<User | null>
    getUserById(id: number): Promise<User>
    editUser(user: User): Promise<void>
    deleteUser(id: number): Promise<void>
}