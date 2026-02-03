import db from "../config/db.js";

export const getDashboardStats = async (req, res) => {
    try {
        // Basic Stats
        const [[{ totalUsers }]] = await db.query("SELECT COUNT(*) as totalUsers FROM users");
        const [[{ totalMangas }]] = await db.query("SELECT COUNT(*) as totalMangas FROM mangas");
        const [[{ totalChapters }]] = await db.query("SELECT COUNT(*) as totalChapters FROM chapters");
        const [[{ totalRevenue }]] = await db.query("SELECT SUM(amount) as totalRevenue FROM subscription_payments WHERE status = 'paid'");

        // User Stats
        const [[{ activeSubscribers }]] = await db.query("SELECT COUNT(*) as activeSubscribers FROM users WHERE subscription != 'free'");

        // Recent Activities
        const [recentUsers] = await db.query("SELECT id, username, email, created_at FROM users ORDER BY created_at DESC LIMIT 5");
        const [recentChapters] = await db.query(`
            SELECT c.id, c.number, c.release_date, m.title as manga_title 
            FROM chapters c 
            JOIN mangas m ON c.manga_id = m.id 
            ORDER BY c.created_at DESC LIMIT 5
        `);

        // Views Stats
        const [[{ totalViews }]] = await db.query("SELECT SUM(views) as totalViews FROM mangas");

        res.json({
            stats: {
                totalUsers,
                totalMangas,
                totalChapters,
                totalRevenue: totalRevenue || 0,
                activeSubscribers,
                totalViews: totalViews || 0
            },
            recentUsers,
            recentChapters
        });
    } catch (error) {
        console.error("Admin Stats Error:", error);
        res.status(500).json({ message: "Erreur lors de la récupération des statistiques" });
    }
};

export const createManga = async (req, res) => {
    const { title, title2, description, author, artist, status, type, cover_url, banner_url } = req.body;

    try {
        const [result] = await db.query(
            `INSERT INTO mangas (title, title2, description, author, artist, status, type, cover_url, banner_url) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [title, title2 || "", description, author || "", artist || "", status || "ongoing", type || "manga", cover_url, banner_url || ""]
        );

        res.status(201).json({ id: result.insertId, message: "Manga créé avec succès" });
    } catch (error) {
        console.error("Create manga error:", error);
        res.status(500).json({ message: error.message });
    }
};

export const updateManga = async (req, res) => {
    const { id } = req.params;
    const { title, title2, description, author, artist, status, type, cover_url, banner_url } = req.body;

    try {
        await db.query(
            `UPDATE mangas SET title = ?, title2 = ?, description = ?, author = ?, artist = ?, 
             status = ?, type = ?, cover_url = ?, banner_url = ? WHERE id = ?`,
            [title, title2, description, author, artist, status, type, cover_url, banner_url, id]
        );

        res.json({ message: "Manga mis à jour" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteManga = async (req, res) => {
    const { id } = req.params;

    try {
        await db.query("DELETE FROM mangas WHERE id = ?", [id]);
        res.json({ message: "Manga supprimé" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const [users] = await db.query(
            "SELECT id, username, email, role, subscription, created_at FROM users ORDER BY created_at DESC"
        );
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUserRole = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    try {
        await db.query("UPDATE users SET role = ? WHERE id = ?", [role, id]);
        res.json({ message: "Rôle mis à jour" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        await db.query("DELETE FROM users WHERE id = ?", [id]);
        res.json({ message: "Utilisateur supprimé" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
