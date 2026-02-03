import express from "express";
import { addHistory, getHistory } from "../controllers/history.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, addHistory);
router.get("/", protect, getHistory);

export default router;
