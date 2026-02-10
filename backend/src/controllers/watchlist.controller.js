import db from "../config/db.js";

export const addWatchlist = async (req, res) => {
    const { manga_id } = req.body;
    console.log(`[Watchlist] Adding watchlist for user ${req.user}, manga ${manga_id}`);
    try {
        await db.query("INSERT INTO watchlist (user_id, manga_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE created_at = CURRENT_TIMESTAMP", [
            req.user,
            manga_id
        ]);
        res.status(201).json({ message: "Added to watchlist" });
    } catch (error) {
        console.error("[Watchlist] Add Error:", error);
        res.status(500).json({ message: error.message });
    }
};

export const getWatchlist = async (req, res) => {
    console.log(`[Watchlist] Fetching watchlist for user ${req.user}`);
    try {
        const [watchlist] = await db.query(
            `SELECT m.* FROM mangas m 
             JOIN watchlist w ON m.id = w.manga_id 
             WHERE w.user_id = ? 
             ORDER BY w.created_at DESC`,
            [req.user]
        );
        console.log(`[Watchlist] Found ${watchlist.length} items`);
        res.status(200).json(watchlist);
    } catch (error) {
        console.error("[Watchlist] Fetch Error:", error);
        res.status(500).json({ message: error.message });
    }
};

export const removeWatchlist = async (req, res) => {
    const { manga_id } = req.params;
    console.log(`[Watchlist] Removing watchlist for user ${req.user}, manga ${manga_id}`);
    try {
        await db.query("DELETE FROM watchlist WHERE user_id = ? AND manga_id = ?", [
            req.user,
            manga_id
        ]);
        res.status(200).json({ message: "Removed from watchlist" });
    } catch (error) {
        console.error("[Watchlist] Remove Error:", error);
        res.status(500).json({ message: error.message });
    }
};
