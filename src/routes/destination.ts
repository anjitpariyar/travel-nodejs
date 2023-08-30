import { Router } from "express";
import {
  SearchDestination,
  getDestination,
  getDestinationByID,
  getDestinationByLocation,
  AddDestinations,
} from "../controller/Destination";
import auth from "../middleware/auth";
import { check } from "express-validator";

let router = Router();

/**
 * get destination
 */
router.get("/", getDestination);

/**
 *add destination in bulk
 * function is AddDestinations
 */
router.post(
  "/add",
  auth,
  [
    check("pid").notEmpty().withMessage("PID cannot be empty"),
    check("name").notEmpty().withMessage("Name cannot be empty"),
    check("location").notEmpty().withMessage("Location cannot be empty"),
    check("price").notEmpty().withMessage("Price cannot be empty"),
    check("about").notEmpty().withMessage("About cannot be empty"),
    check("gallery").isArray().withMessage("Gallery must be an array"),
    check("feature").isArray().withMessage("Feature must be an array"),
    check("highlight").isArray().withMessage("highlight must be an array"),
    check("extra").isArray().withMessage("extra must be an array"),
    check("itinerary").isArray().withMessage("itinerary must be an array"),
    check("reviews").isArray().withMessage("Reviews must be an array"),
    check("rate").isNumeric().withMessage("Rate must be a number"),
    check("url").notEmpty().withMessage("URL cannot be empty"),
    check("categoryId").notEmpty().withMessage("categoryId cannot be empty"),
  ],
  (req, res) => {
    res.send("api is hidden in production");
  }
);

/**
 * get destination cities
 */
router.get("/cities", getDestinationByLocation);

router.get("/search", SearchDestination);

/**
 * get destination by id
 */
router.get("/:id", getDestinationByID);

export default router;
