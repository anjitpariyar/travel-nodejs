import { Router } from "express";
import {
  getDestination,
  getDestinationByID,
  getDestinationByLocation,
} from "../controller/Destination";

let router = Router();

/**
 * get destination
 */
router.get("/", getDestination);

/**
 * get destination cities
 */

router.get("/cities", getDestinationByLocation);

/**
 * get destination by id
 */
router.get("/:id", getDestinationByID);

export default router;
