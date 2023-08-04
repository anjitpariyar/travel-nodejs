import { Router } from "express";
import { check } from "express-validator";
import { GetProfile } from "../controller/UserDetails";
import auth from "../middleware/auth";
import multipart from "connect-multiparty";

let multipartMiddleware = multipart();

let router = Router();

/**
 * Create profile route
 */
// router.put("/", auth, EditProfileTask);

/**
 * Get profile
 */
router.get("/", auth, GetProfile);

/**
 * Upload DP
 */
// router.post("/dp", [auth, multipartMiddleware], UploadDP);

export default router;
