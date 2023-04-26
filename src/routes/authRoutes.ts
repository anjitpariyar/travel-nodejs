import { Router } from "express";
import { LoginTask, RegisterTask } from "../controller/Auth";
import { check } from "express-validator";

const router = Router();

/**
 * Register route
 */
/**
 * @swagger
 * /example:
 *      post:
 *          summary: Send the text to the server
 *          tags:
 *              - ExampleEndpoints
 *          description: Send a message to the server and get a response added to the original text.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              responseText:
 *                                  type: string
 *                                  example: This is some example string! This is an endpoint
 *          responses:
 *              201:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  text:
 *                                      type: string
 *                                      example: This is some example string!
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
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
