import { Router } from "express";
import auth from "../middleware/auth";
import { getHotels } from "../controller/Hotel";

let router = Router();

/**
 * Post Comment
 */
router.get("/", getHotels);

/**
 * Delete comment
 */
// router.get("/:fId", deleteCommentTask);

export default router;
