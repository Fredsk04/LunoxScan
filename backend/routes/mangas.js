import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, title, description, cover_url, banner_url FROM mangas ORDER BY created_at DESC LIMIT 6"
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération des mangas" });
  }
});

export default router;
