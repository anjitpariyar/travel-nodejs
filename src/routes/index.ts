import { Router } from "express";
import authRoutes from "./authRoutes";
import hotelRoutes from "./hotelRoutes";
import Category from "./Category";

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

// category
router.use("/category", Category);

/**
 * Profile routes
 */
// router.use("/profile", profileRoutes);

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
