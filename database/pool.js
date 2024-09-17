import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password:  process.env.PASSWORD,
    datasbase: process.env.DATABASE,
});

export default pool;