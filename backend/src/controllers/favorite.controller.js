import db from "../config/db.js";

export const getFavorites = async (req, res) => {
    console.log(`[Favorite] Fetching favorites for user ${req.user}`);
    try {
        const [favorites] = await db.query(
            "SELECT m.* FROM mangas m JOIN favorites f ON m.id = f.manga_id WHERE f.user_id = ?",
            [req.user]
        );
        console.log(`[Favorite] Found ${favorites.length} items`);
        res.json(favorites);
    } catch (error) {
        console.error("[Favorite] Fetch Error:", error);
        res.status(500).json({ message: error.message });
    }
};

export const addFavorite = async (req, res) => {
    const { manga_id } = req.body;
    console.log(`[Favorite] Adding favorite for user ${req.user}, manga ${manga_id}`);
    try {
        await db.query("INSERT IGNORE INTO favorites (user_id, manga_id) VALUES (?, ?)", [req.user, manga_id]);
        res.json({ message: "Ajouté aux favoris" });
    } catch (error) {
        console.error("[Favorite] Add Error:", error);
        res.status(500).json({ message: error.message });
    }
};

export const removeFavorite = async (req, res) => {
    const { manga_id } = req.params;
    console.log(`[Favorite] Removing favorite for user ${req.user}, manga ${manga_id}`);
    try {
        await db.query("DELETE FROM favorites WHERE user_id = ? AND manga_id = ?", [req.user, manga_id]);
        res.json({ message: "Retiré des favoris" });
    } catch (error) {
        console.error("[Favorite] Remove Error:", error);
        res.status(500).json({ message: error.message });
    }
};
