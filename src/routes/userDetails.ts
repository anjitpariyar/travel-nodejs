import { Router } from "express";
import { GetProfile, EditProfileTask } from "../controller/UserDetails";
import auth from "../middleware/auth";
import multipart from "connect-multiparty";

let multipartMiddleware = multipart();

let router = Router();

/**
 * Create profile route
 */
router.put("/", auth, EditProfileTask);

/**
 * Get profile
 */
router.get("/", auth, GetProfile);

export default router;
