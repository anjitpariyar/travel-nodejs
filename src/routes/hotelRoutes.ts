import { Router } from "express";
import {
  getHotels,
  getHotelsByID,
  toggleHotelsByID,
  getSavedHotels,
} from "../controller/Hotel";
import auth from "../middleware/auth";

let router = Router();

/**
 * Hotels
 */
router.get("/", getHotels);

/**
 * get saved like data
 */

router.get("/save", auth, getSavedHotels);

/**
 *Save / unSave Hotel
 */
router.put("/save/:id", auth, toggleHotelsByID);

/**
 * Hotels details
 */
router.get("/:id", getHotelsByID);

export default router;
