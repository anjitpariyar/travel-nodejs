import { Router } from "express";
import authRoutes from "./authRoutes";
import hotelRoutes from "./hotelRoutes";
import Category from "./Category";
import Destination from "./destination";
import UserDetails from "./userDetails";
import Booking from "./Booking";

const router = Router();
// testing
router.use("/test", (req, res) => {
  res.send("working..");
});

/**
 * Authentication routes
 */
router.use("/auth", authRoutes);

/**
 * hotels routes
 */
router.use("/hotels", hotelRoutes);

/**
 * booking routes
 */
router.use("/booking", Booking);

// category
router.use("/category", Category);

// category
router.use("/destinations", Destination);

/**
 * Profile routes
 */
router.use("/user", UserDetails);

/**
 * Bucket routes
 */
// router.use("/bucket", bucketRoutes);

/**
 * Feeds routes
 */
// router.use("/feed", feedRoutes);

/**
 * Comment routes
 */

export default router;
