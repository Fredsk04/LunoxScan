import bcrypt from "bcryptjs";
import db from "../config/db.js";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const [existing] = await db.query("SELECT id FROM users WHERE email = ?", [email]);
        if (existing.length) return res.status(400).json({ message: "Email déjà utilisé" });

        const hash = await bcrypt.hash(password, 10);

        const [result] = await db.query(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            [username, email, hash]
        );

        const token = generateToken(result.insertId);
        res.json({ token });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: "Erreur serveur lors de l'inscription" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body; // 'email' acts as identifier here

        const [user] = await db.query(
            "SELECT * FROM users WHERE email = ? OR username = ?",
            [email, email]
        );
        if (!user.length) return res.status(400).json({ message: "Utilisateur introuvable" });

        const valid = await bcrypt.compare(password, user[0].password);
        if (!valid) return res.status(400).json({ message: "Mot de passe incorrect" });

        const token = generateToken(user[0].id);
        res.json({ token });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Erreur serveur lors de la connexion" });
    }
};

export const me = async (req, res) => {
    try {
        const [users] = await db.query("SELECT id, username, email, avatar_url, role, subscription FROM users WHERE id = ?", [
            req.user,
        ]);
        let user = users[0];
        if (user.role === 'admin') user.subscription = 'mythic';
        if (user.role === 'staff') user.subscription = 'epique';
        res.json(user);
    } catch (error) {
        console.error("Me Error:", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

export const logout = (req, res) => {
    res.json({ message: "Déconnecté" });
};
