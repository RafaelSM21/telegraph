import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "morse",
  password: process.env.DB_PASS || "Guts",
  port: parseInt(process.env.DB_PORT || "5432", 10),
});
