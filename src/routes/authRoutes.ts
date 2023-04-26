import { Router } from "express";
import { LoginTask, RegisterTask } from "../controller/Auth";
import { check } from "express-validator";

const router = Router();

/**
 * Register route
 */
router.post(
  "/",
  [
    check("email", "This must be a valid email address.").isEmail(),
    check("password", "Password must be more than 6 character").isLength({
      min: 6,
    }),
    check("role", "Role cannt be empty").notEmpty(),
  ],
  RegisterTask
);

/**
 * Login route
 */
router.post(
  "/login",
  [
    check("email", "Email cannot be empty")
      .notEmpty()
      .isEmail()
      .withMessage("Please Enter valid email address."),
    check("password", "This cannot be empty").notEmpty(),
  ],
  LoginTask
);

export default router;
