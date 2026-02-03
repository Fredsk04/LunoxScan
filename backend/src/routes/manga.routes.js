import express from "express";
import { getAllMangas, searchMangas, getMangaById } from "../controllers/manga.controller.js";

const router = express.Router();

router.get("/", getAllMangas);
router.get("/search", searchMangas);
router.get("/:id", getMangaById);

export default router;
