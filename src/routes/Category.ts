import { Router } from "express";
import { getHotels, getHotelsByID } from "../controller/Hotel";

let router = Router();

/**
 * Post Comment
 */
router.get("/", getHotels);

/**
 * Delete comment
 */
router.get("/:id", getHotelsByID);

export default router;
