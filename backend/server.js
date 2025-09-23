import express from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// --------- 🔹 MIDDLEWARES 🔹 ---------
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // Autorise les requêtes venant du frontend
app.use(express.json()); // Permet de lire req.body en JSON
app.use(express.urlencoded({ extended: true })); // Pour les formulaires classiques

// --------- 🔹 DATABASE 🔹 ---------
const db = await mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// --------- 🔹 ROUTES 🔹 ---------
app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Vérifier si user existe déjà
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ? OR username = ?",
      [email, username]
    );
    if (rows.length > 0) {
      return res.status(400).json({ message: "Utilisateur déjà existant" });
    }

    // Hasher mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insérer utilisateur
    await db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    res.json({ message: "Inscription réussie 🎉" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

app.post("/api/login", async (req, res) => {
  const { identifier, password } = req.body;

  try {
    // Vérifier utilisateur (email ou username)
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ? OR username = ?",
      [identifier, identifier]
    );
    if (rows.length === 0) {
      return res.status(400).json({ message: "Utilisateur non trouvé" });
    }

    const user = rows[0];

    // Vérifier mot de passe
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ message: "Connexion réussie ✅", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// --------- 🔹 SERVER START 🔹 ---------
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
