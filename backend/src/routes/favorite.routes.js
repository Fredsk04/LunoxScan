import express from "express";
import { getFavorites, addFavorite, removeFavorite } from "../controllers/favorite.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getFavorites);
router.post("/", protect, addFavorite);
router.delete("/:manga_id", protect, removeFavorite);

export default router;
