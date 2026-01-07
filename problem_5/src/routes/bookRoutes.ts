import { Router } from "express";
import { getBooks, getBook, createBook, updateBookDetails, deleteBookById } from "../controllers/bookController.js";

const router = Router();

router.get("/", getBooks);
router.get("/:id", getBook);
router.post("/", createBook);
router.put("/:id", updateBookDetails);
router.delete("/:id", deleteBookById);


export default router;