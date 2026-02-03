import express from "express";
import {
    getDashboardStats,
    createManga,
    updateManga,
    deleteManga,
    getAllUsers,
    updateUserRole,
    deleteUser
} from "../controllers/admin.controller.js";
import { protect, admin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/stats", protect, admin, getDashboardStats);

// Manga management
router.post("/manga", protect, admin, createManga);
router.put("/manga/:id", protect, admin, updateManga);
router.delete("/manga/:id", protect, admin, deleteManga);

// User management
router.get("/users", protect, admin, getAllUsers);
router.put("/users/:id/role", protect, admin, updateUserRole);
router.delete("/users/:id", protect, admin, deleteUser);

export default router;
