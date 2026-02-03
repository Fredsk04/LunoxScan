import db from "../config/db.js";

export const getAllMangas = async (req, res) => {
    try {
        const [mangas] = await db.query("SELECT * FROM mangas ORDER BY created_at DESC");
        res.json(mangas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchMangas = async (req, res) => {
    const { q } = req.query;
    try {
        const [mangas] = await db.query(
            "SELECT * FROM mangas WHERE title LIKE ? OR title2 LIKE ? OR description LIKE ?",
            [`%${q}%`, `%${q}%`, `%${q}%`]
        );
        res.json(mangas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMangaById = async (req, res) => {
    const { id } = req.params;
    try {
        const [[manga]] = await db.query("SELECT * FROM mangas WHERE id = ?", [id]);
        if (!manga) return res.status(404).json({ message: "Manga not found" });
        res.json(manga);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
