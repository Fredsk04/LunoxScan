import express from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import mangasRoutes from "./routes/mangas.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// --------- 🔹 MIDDLEWARES 🔹 ---------
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// --------- 🔹 ROUTES 🔹 ---------

      // --------- 🔹 REGISTER 🔹 ---------
app.post("/api/register", async (req, res) => {
  const { username, email, password, rememberMe } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ? OR username = ?",
      [email, username]
    );
    if (rows.length > 0) {
      return res.status(400).json({ message: "Utilisateur déjà existant" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    const token = jwt.sign(
      { username, email },
      process.env.JWT_SECRET,
      { expiresIn: rememberMe ? "30d" : "1d" }
    );

    res.json({ message: "Inscription réussie 🎉" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

      // --------- 🔹 LOGIN 🔹 ---------
app.post("/api/login", async (req, res) => {
  const { identifier, password, rememberMe } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ? OR username = ?",
      [identifier, identifier]
    );
    if (rows.length === 0) {
      return res.status(400).json({ message: "Utilisateur non trouvé" });
    }

    const user = rows[0];

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: rememberMe ? "30d" : "1d" } // <-- durée ajustée ici
    );

    res.json({
      message: "Connexion réussie ✅",
      token,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

      // --------- 🔹 MANGAS 🔹 ---------
app.use("/api/mangas", mangasRoutes);

// --------- 🔹 SERVER START 🔹 ---------
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
