import { Router } from "express";
import {
  getHotels,
  getHotelsByID,
  toggleHotelsByID,
} from "../controller/Hotel";
import auth from "../middleware/auth";

let router = Router();

/**
 * Hotels
 */
router.get("/", getHotels);

/**
 *Save / unSave Hotel
 */
router.put("/save/:id", auth, toggleHotelsByID);

/**
 * Hotels details
 */
router.get("/:id", getHotelsByID);

export default router;
