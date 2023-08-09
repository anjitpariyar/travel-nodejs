import { Router } from "express";
import {
  GetProfile,
  EditProfileTask,
  ChangePassword,
} from "../controller/UserDetails";
import auth from "../middleware/auth";
import { check } from "express-validator";

import multipart from "connect-multiparty";

let router = Router();

/**
 * Create profile route
 */
router.put("/", auth, EditProfileTask);

/**
 * Get profile
 */
router.get("/", auth, GetProfile);

/**
 *Update password
 */
router.put(
  "/password-update",
  [
    check("password", "Password must be more than 6 character").isLength({
      min: 6,
    }),
  ],
  auth,
  ChangePassword
);

export default router;
