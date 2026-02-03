import db from "../config/db.js";

export const getGenres = async (req, res) => {
    try {
        const [genres] = await db.query("SELECT * FROM genres ORDER BY name ASC");
        res.json(genres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addGenre = async (req, res) => {
    const { name, image_url } = req.body;
    try {
        const [result] = await db.query("INSERT INTO genres (name, image_url) VALUES (?, ?)", [name, image_url || ""]);
        res.status(201).json({ id: result.insertId, name, image_url });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteGenre = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM genres WHERE id = ?", [id]);
        res.json({ message: "Genre supprimé" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
