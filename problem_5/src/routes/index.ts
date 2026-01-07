import { Router } from "express";
import bookRoutes from "./bookRoutes.js";

const router = Router();
router.use("/books", bookRoutes);

export default router;