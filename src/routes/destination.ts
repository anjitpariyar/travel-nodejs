import { Router } from "express";
import {
  SearchDestination,
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

router.get("/search", SearchDestination);

/**
 * get destination by id
 */
router.get("/:id", getDestinationByID);

export default router;
