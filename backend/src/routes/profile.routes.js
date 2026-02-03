import express from "express";
import {
    getProfile,
    updateProfile,
    updateAvatar,
    deleteAccount,
} from "../controllers/profile.controller.js";
import { upload } from "../utils/upload.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getProfile);
router.put("/", protect, updateProfile);
router.put("/avatar", protect, upload.single("avatar"), updateAvatar);
router.delete("/", protect, deleteAccount);

export default router;
