import express from "express";
import { getGenres, addGenre, deleteGenre } from "../controllers/genre.controller.js";
import { protect, admin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getGenres);
router.post("/", protect, admin, addGenre);
router.delete("/:id", protect, admin, deleteGenre);

export default router;
