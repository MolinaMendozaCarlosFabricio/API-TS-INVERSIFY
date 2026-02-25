import mysql from "mysql2/promise";
import type { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import dotenv from "dotenv";
import { injectable } from "inversify";

@injectable()
export class ConnectionMySQL {
  public pool: Pool | null;
  public err: string;

  constructor(pool: Pool | null, err: string) {
    this.pool = pool;
    this.err = err;
  }

  static async createConnection(): Promise<ConnectionMySQL> {
    try {
        dotenv.config();
          const config = {
            database: {
                host: process.env.DB_HOST || "",
                user: process.env.DB_USER || "",
                password: process.env.DB_PASS || "",
                database: process.env.DB_NAME || "",
                port: Number(process.env.DB_PORT) || 3306,
            },
            server: {
                port: Number(process.env.SERVER_PORT) || 3000,
                debug: process.env.SERVER_DEBUG === "true",
            },
      };

      if (!config.database.host) {
        return new ConnectionMySQL(null, "Error: Host de la base de datos vacío");
      }

      const pool = mysql.createPool({
        host: config.database.host,
        user: config.database.user,
        password: config.database.password,
        database: config.database.database,
        port: config.database.port,
        waitForConnections: true,
        connectionLimit: 10,
      });

      const connection = await pool.getConnection();
      await connection.ping();
      connection.release();

      console.log("Conexión exitosa a la base de datos");

      return new ConnectionMySQL(pool, "");
    } catch (error: any) {
      return new ConnectionMySQL(
        null,
        `Error al establecer la conexión con la BD: ${error.message}`
      );
    }
  }

  async execPreparedQuery(
    query: string,
    values: any[]
  ): Promise<ResultSetHeader> {
    if (!this.pool) {
      throw new Error("Conexión no inicializada");
    }

    try {
      const [result] = await this.pool.execute<ResultSetHeader>(
        query,
        values
      );
      return result;
    } catch (error: any) {
      throw new Error(`Error al ejecutar la consulta: ${error.message}`);
    }
  }

  async fetchRows<T extends RowDataPacket[]>(
    query: string,
    values: any[]
  ): Promise<T> {
    if (!this.pool) {
      throw new Error("Conexión no inicializada");
    }

    try {
      const [rows] = await this.pool.execute<T>(query, values);
      return rows;
    } catch (error: any) {
      throw new Error(`Error al obtener las filas: ${error.message}`);
    }
  }
}