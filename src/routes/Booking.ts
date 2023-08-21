import { Router } from "express";
import {
  GetBooking,
  PostBooking,
  UpdatingBooking,
} from "../controller/Booking";
import auth from "../middleware/auth";
import { check } from "express-validator";

let router = Router();

/**
 * Hotels
 */
router.get("/", auth, GetBooking);
/**
 *
 */
router.post(
  "/:id",
  auth,
  [
    check("startDate").notEmpty().withMessage("Date is required"),
    check("paymentMethod")
      .notEmpty()
      .withMessage("Payment method is required")
      .isIn(["online", "cod"])
      .withMessage("Invalid payment method"),
    check("payment").isNumeric().withMessage("Payment must be a number"),
    check("fullName").notEmpty().withMessage("Full name is required"),
    check("contact").notEmpty().withMessage("Contact is required"),
    check("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email format"),
    check("roomType").notEmpty().withMessage("Room type is required"),
    check("endDate").notEmpty().withMessage("endDate is required"),
    check("status")
      .notEmpty()
      .withMessage("Status is required")
      .isIn(["request", "booked", "expired", "cancel", "canceled"])
      .withMessage("Invalid status"),
    check("type")
      .notEmpty()
      .withMessage("Type is required")
      .isIn(["hotel", "destination"])
      .withMessage("Invalid type"),
  ],
  PostBooking
);

router.put(
  "/:id",
  auth,
  [
    check("payment")
      .optional()
      .isNumeric()
      .withMessage("Payment must be a number"),
    check("roomNumber")
      .optional()
      .isNumeric()
      .withMessage("roomNumber is required"),
    check("status")
      .notEmpty()
      .withMessage("Status is required")
      .isIn(["booked", "cancel", "canceled"])
      .withMessage("Invalid status"),
  ],
  UpdatingBooking
);

export default router;
