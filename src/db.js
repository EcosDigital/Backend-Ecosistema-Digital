import pg from 'pg';

import { DB_USER, DB_HOST, DB_PASS, DB_NAME, DB_PORT } from "./config.js"

export const pool = new pg.Pool({
  user: DB_USER,
  host: DB_HOST,
  password: DB_PASS,
  database: DB_NAME,
  port: DB_PORT
});

