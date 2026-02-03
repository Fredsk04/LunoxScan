// src/controllers/subscription.controller.js
import db from "../config/db.js";

/**
 * Souscrire ou mettre à jour l'abonnement de l'utilisateur
 */
export const subscribe = async (req, res) => {
  const userId = req.user;
  const { plan } = req.body;

  const validPlans = ["epique", "legende", "mythic", "star"];
  if (!validPlans.includes(plan)) {
    return res.status(400).json({ message: "Plan invalide" });
  }

  try {
    await db.query(
      "UPDATE users SET subscription = ? WHERE id = ?",
      [plan, userId]
    );
    res.json({ message: "Abonnement mis à jour", subscription: plan });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/**
 * Récupérer le statut d'abonnement actuel de l'utilisateur
 */
export const getStatus = async (req, res) => {
  const userId = req.user;

  try {
    const [rows] = await db.query(
      "SELECT subscription FROM users WHERE id = ?",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json({ subscription: rows[0].subscription });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/**
 * Annuler l'abonnement et revenir au plan "free"
 */
export const cancelSubscription = async (req, res) => {
  const userId = req.user;

  try {
    await db.query(
      "UPDATE users SET subscription = 'free' WHERE id = ?",
      [userId]
    );
    res.json({ message: "Abonnement annulé", subscription: "free" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
