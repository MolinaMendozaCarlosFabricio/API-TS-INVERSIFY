import type { UsersDBRepository } from "../../domain/repository/UsersDBRepository.js";
import type { User } from "../../domain/models/User.js";
import { UserSchema } from "../../domain/models/User.js";
import { ConnectionMySQL } from "../../../core/DBConection.js";
import type { RowDataPacket } from "mysql2";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../shared/types.js";

@injectable()
export class AbstractUsersMySQLRepository
  implements UsersDBRepository
{
  protected connection: ConnectionMySQL;

  constructor(
    @inject(TYPES.ConnectionMySQL)
    connection: ConnectionMySQL
  ) {
    if (connection.err) {
      throw new Error(connection.err);
    }
    this.connection = connection;
  }

  async createUser(user: User): Promise<void> {
    const validatedUser = UserSchema.omit({ id: true }).parse(user);

    await this.connection.execPreparedQuery(
      `INSERT INTO users (username, password) VALUES (?, ?)`,
      [validatedUser.username, validatedUser.password]
    );
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const rows = await this.connection.fetchRows<RowDataPacket[]>(
        `SELECT id, username, password FROM users WHERE username = ?`,
        [username]
    );

    if (rows.length === 0) {
        return null;
    }

    const user = UserSchema.parse(rows[0]);

    return user;
  }

  async getUserById(id: number): Promise<User> {
    const rows = await this.connection.fetchRows<RowDataPacket[]>(
      `SELECT id, username, password FROM users WHERE id = ?`,
      [id]
    );

    if (rows.length === 0) {
      throw new Error("Usuario no encontrado");
    }

    const user = UserSchema.parse(rows[0]);

    return user;
  }

  async editUser(user: User): Promise<void> {
    const validatedUser = UserSchema.parse(user);

    const result = await this.connection.execPreparedQuery(
      `UPDATE users 
       SET username = ?, password = ?
       WHERE id = ?`,
      [validatedUser.username, validatedUser.password, validatedUser.id]
    );

    if (result.affectedRows === 0) {
      throw new Error("Usuario no encontrado para actualizar");
    }
  }

  async deleteUser(id: number): Promise<void> {
    const result = await this.connection.execPreparedQuery(
      `DELETE FROM users WHERE id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      throw new Error("Usuario no encontrado para eliminar");
    }
  }
}