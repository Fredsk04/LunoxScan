import db from "../config/db.js";

export const addWatchlist = async (req, res) => {
    const { manga_id } = req.body;
    try {
        await db.query("INSERT INTO watchlist (user_id, manga_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE created_at = CURRENT_TIMESTAMP", [
            req.user,
            manga_id
        ]);
        res.status(201).json({ message: "Added to watchlist" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getWatchlist = async (req, res) => {
    try {
        const [watchlist] = await db.query(
            `SELECT m.* FROM mangas m 
             JOIN watchlist w ON m.id = w.manga_id 
             WHERE w.user_id = ? 
             ORDER BY w.created_at DESC`,
            [req.user]
        );
        res.status(200).json(watchlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeWatchlist = async (req, res) => {
    const { manga_id } = req.params;
    try {
        await db.query("DELETE FROM watchlist WHERE user_id = ? AND manga_id = ?", [
            req.user,
            manga_id
        ]);
        res.status(200).json({ message: "Removed from watchlist" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
