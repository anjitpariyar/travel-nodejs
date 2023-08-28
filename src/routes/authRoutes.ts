import { Router } from "express";
import { LoginTask, RegisterTask, LogoutTask } from "../controller/Auth";
import { check } from "express-validator";
import auth from "../middleware/auth";

const router = Router();
/**
 * Register route
 */
router.post(
  "/",
  [
    check("email", "This must be a valid email address.").isEmail(),
    check("fullName", "fullName must not be empty")
      .notEmpty()
      .matches(/^[a-zA-Z]+ [a-zA-Z]+$/)
      .withMessage("Full name must contain only letters and spaces"),
    check("password", "Password must be more than 6 character").isLength({
      min: 6,
    }),
    check("role", "Role cannt be empty")
      .notEmpty()
      .isIn([0, 1, 2])
      .withMessage("Role must be 0,1 or 2"),
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

router.get("/logout", auth, LogoutTask);

export default router;
