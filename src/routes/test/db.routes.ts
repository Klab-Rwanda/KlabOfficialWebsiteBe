import pool from "../../config/db.config";
import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
    try {
      const result = await pool.query("SELECT NOW()");
      res.json({ connected: true, time: result.rows[0].now });
    } catch (error) {
      res.status(500).json({ connected: false });
    }
  });

  export default router;