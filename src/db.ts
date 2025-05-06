import { Pool } from 'pg';

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "123",
  database: "morse_decoder",
});

export default pool;