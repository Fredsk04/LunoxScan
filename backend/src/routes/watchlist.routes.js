import express from "express";
import {
    addWatchlist,
    getWatchlist,
    removeWatchlist,
} from "../controllers/watchlist.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, addWatchlist);
router.get("/", protect, getWatchlist);
router.delete("/:mangaId", protect, removeWatchlist);

export default router;
