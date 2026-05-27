import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

// ─── PostgreSQL connection config ──────────────────────────────────────────
const pool = new Pool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME     || 'intellixbom',
  user:     process.env.DB_USER     || 'postgres',
  password: process.env.DB_PASSWORD || 'your_password',
});
// ───────────────────────────────────────────────────────────────────────────

/**
 * Creates the demo_requests table if it doesn't already exist.
 */
export async function createTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS demo_requests (
      id            SERIAL        PRIMARY KEY,
      name          VARCHAR(255)  NOT NULL,
      email         VARCHAR(255)  NOT NULL,
      organization  VARCHAR(255),
      created_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW()
    );
  `);
  console.log('✅  Table "demo_requests" ready.');
}

export default pool;
