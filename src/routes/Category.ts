import { Router } from "express";
import { getCategory } from "../controller/Category";
let router = Router();

/**
 * Post Comment
 */
router.get("/", getCategory);

/**
 * Delete comment
 */
// router.get("/:id", getHotelsByID);

export default router;
