import { Router, Request, Response } from 'express';
import pool from './db';

const router = Router();

// Rota para obter os sinais
router.get('/api/sinais', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT * FROM sinais_morse ORDER BY created_at DESC LIMIT 10"
    );
    res.status(200).json(result.rows);
  } catch (err: any) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// Rota para adicionar um sinal (simulação)
router.post('/api/morse', async (req: Request, res: Response) => {
  const { sinal, letra } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO sinais_morse (sinal, letra) VALUES ($1, $2) RETURNING *",
      [sinal, letra]
    );
    res.status(200).json({ status: "success", data: result.rows[0] });
  } catch (err: any) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

router.delete('/api/sinais', async (req: Request, res: Response) => {
  try {
    await pool.query("DELETE FROM sinais_morse");
    res.status(200).json({ status: "success", message: "Sinais apagados." });
  } catch (err: any) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

export default router;