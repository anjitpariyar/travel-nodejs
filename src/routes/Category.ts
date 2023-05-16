import { Router } from "express";
import { getCategory, getCategoryByID } from "../controller/Category";
let router = Router();

/**
 * Post Comment
 */
router.get("/", getCategory);

/**
 * Delete comment
 */
router.get("/:id", getCategoryByID);

export default router;
