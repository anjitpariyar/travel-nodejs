import { Router } from "express";
import {
  getCategory,
  getCategoryByID,
  categoryAdd,
} from "../controller/Category";
let router = Router();

import auth from "../middleware/auth";
import { check } from "express-validator";

/**
 * Post Comment
 */
router.get("/", getCategory);

router.post(
  "/add",
  [
    check("icon").notEmpty().withMessage("PID cannot be empty"),
    check("name").notEmpty().withMessage("Name cannot be empty"),
    check("backgroundImage").notEmpty().withMessage("Location cannot be empty"),
    check("about").notEmpty().withMessage("About cannot be empty"),
  ],
  auth,
  categoryAdd
);

/**
 * Delete comment
 */
router.get("/:id", getCategoryByID);

export default router;
