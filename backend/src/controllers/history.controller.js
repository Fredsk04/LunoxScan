import db from "../config/db.js";

export const addHistory = async (req, res) => {
    const { manga_id, chapter_id } = req.body;
    try {
        await db.query(
            "INSERT INTO reading_history (user_id, manga_id, chapter_id) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE chapter_id = ?, last_read_at = CURRENT_TIMESTAMP",
            [req.user, manga_id, chapter_id, chapter_id]
        );
        res.status(201).json({ message: "Added to history" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getHistory = async (req, res) => {
    try {
        const [history] = await db.query(
            `SELECT m.*, rh.last_read_at, c.number as chapter_number 
             FROM reading_history rh 
             JOIN mangas m ON rh.manga_id = m.id 
             JOIN chapters c ON rh.chapter_id = c.id 
             WHERE rh.user_id = ? 
             ORDER BY rh.last_read_at DESC`,
            [req.user]
        );
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
