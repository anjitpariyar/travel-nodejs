import { Router } from "express";
import authRoutes from "./authRoutes";
import commentRoutes from "./commentRoutes";

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
router.use("/comment", commentRoutes);

export default router;
