import db from "../config/db.js";

export const getProfile = async (req, res) => {
    const [[user]] = await db.query("SELECT id, username, email, avatar_url, bio, role, subscription FROM users WHERE id = ?", [
        req.user,
    ]);
    if (user.role === 'admin') user.subscription = 'mythic';
    if (user.role === 'staff') user.subscription = 'epique';
    res.json(user);
};

export const updateProfile = async (req, res) => {
    const { username, email, bio } = req.body;

    await db.query("UPDATE users SET username=?, email=?, bio=? WHERE id=?", [
        username,
        email,
        bio,
        req.user,
    ]);

    res.json({ message: "Profil mis à jour" });
};

export const updateAvatar = async (req, res) => {
    const avatarURL = `/uploads/${req.file.filename}`;

    await db.query("UPDATE users SET avatar_url=? WHERE id=?", [avatarURL, req.user]);

    res.json({ avatar: avatarURL });
};

export const deleteAccount = async (req, res) => {
    await db.query("DELETE FROM users WHERE id=?", [req.user]);
    res.json({ message: "Compte supprimé" });
};
