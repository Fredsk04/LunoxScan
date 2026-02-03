import db from "../config/db.js";

export const getFavorites = async (req, res) => {
    try {
        const [favorites] = await db.query(
            "SELECT m.* FROM mangas m JOIN favorites f ON m.id = f.manga_id WHERE f.user_id = ?",
            [req.user]
        );
        res.json(favorites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addFavorite = async (req, res) => {
    const { manga_id } = req.body;
    try {
        await db.query("INSERT INTO favorites (user_id, manga_id) VALUES (?, ?)", [req.user, manga_id]);
        res.json({ message: "Ajouté aux favoris" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeFavorite = async (req, res) => {
    const { manga_id } = req.params;
    try {
        await db.query("DELETE FROM favorites WHERE user_id = ? AND manga_id = ?", [req.user, manga_id]);
        res.json({ message: "Retiré des favoris" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
