import { Router } from "express";
import { getBooks } from "../controllers/bookController.js";

const router = Router();

router.get("/", getBooks);
router.get("/:id", getBooks);
router.post("/", getBooks);
router.put("/:id", getBooks);
router.delete("/:id", getBooks);

export default router;