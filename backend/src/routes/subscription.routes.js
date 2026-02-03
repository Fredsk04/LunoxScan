import express from "express";
import {
    subscribe,
    getStatus,
    cancelSubscription,
} from "../controllers/subscription.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, subscribe);
router.get("/", protect, getStatus);
router.delete("/", protect, cancelSubscription);

export default router;
