import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pool, { createTable } from './db.js';

const app  = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({ origin: '*' }));   // allow requests from Vite dev server
app.use(express.json());

// ── Routes ───────────────────────────────────────────────────────────────────

/**
 * POST /api/demo-request
 * Body: { name, email, organization }
 * Saves a demo request into the demo_requests table.
 */
app.post('/api/demo-request', async (req, res) => {
  const { name, email, organization } = req.body;

  // Basic validation
  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required.' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO demo_requests (name, email, organization)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, organization, created_at`,
      [name.trim(), email.trim().toLowerCase(), (organization || '').trim()]
    );

    const row = result.rows[0];
    console.log(`📥  New demo request saved — id: ${row.id}, email: ${row.email}`);

    return res.status(201).json({
      success: true,
      message: 'Demo request saved.',
      data: row,
    });
  } catch (err) {
    console.error('DB error:', err.message);
    return res.status(500).json({ error: 'Failed to save request. Please try again.' });
  }
});

/**
 * GET /api/demo-requests
 * Returns all demo requests (for admin/internal use).
 */
app.get('/api/demo-requests', async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM demo_requests ORDER BY created_at DESC`
    );
    return res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error('DB error:', err.message);
    return res.status(500).json({ error: 'Failed to fetch requests.' });
  }
});

// ── Start ─────────────────────────────────────────────────────────────────────
async function start() {
  await createTable();          // ensure table exists on boot
  app.listen(PORT, () => {
    console.log(`🚀  API server running at http://localhost:${PORT}`);
  });
}

start();
