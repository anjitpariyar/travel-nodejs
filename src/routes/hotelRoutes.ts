import { Router } from "express";
import {
  getHotels,
  getHotelsByID,
  toggleHotelsByID,
  getSavedHotels,
  HotelAdd,
} from "../controller/Hotel";
import auth from "../middleware/auth";
import { check, validationResult } from "express-validator";

let router = Router();

/**
 * Hotels
 */
router.get("/", getHotels);

/**
 * Add Bulk Hotels
 */

router.post(
  "/add",
  [
    check("pid").notEmpty().withMessage("PID cannot be empty"),
    check("name").notEmpty().withMessage("Name cannot be empty"),
    check("location").notEmpty().withMessage("Location cannot be empty"),
    check("price").notEmpty().withMessage("Price cannot be empty"),
    check("about").notEmpty().withMessage("About cannot be empty"),
    check("service").isArray().withMessage("Service must be an array"),
    check("food").isArray().withMessage("Food must be an array"),
    check("reviews").isArray().withMessage("Reviews must be an array"),
    check("rate").isNumeric().withMessage("Rate must be a number"),
    check("gallery").isArray().withMessage("Gallery must be an array"),
    check("url").notEmpty().withMessage("URL cannot be empty"),
  ],
  auth,
  HotelAdd
);

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
