import jwt from "jsonwebtoken";
import db from "../config/db.js";

export const protect = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Non autorisé" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const [rows] = await db.query("SELECT id, role FROM users WHERE id = ?", [decoded.id]);

        if (!rows.length) return res.status(401).json({ message: "Utilisateur introuvable" });

        req.user = rows[0].id;
        req.role = rows[0].role;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token invalide" });
    }
};

export const admin = (req, res, next) => {
    if (req.role !== 'admin') {
        return res.status(403).json({ message: "Accès refusé: Réservé aux administrateurs" });
    }
    next();
};
