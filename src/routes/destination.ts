import { Router } from "express";
import { getDestination, getDestinationByID } from "../controller/Destination";

let router = Router();

/**
 * Post Comment
 */
router.get("/", getDestination);

/**
 * Delete comment
 */
router.get("/:id", getDestinationByID);

export default router;
