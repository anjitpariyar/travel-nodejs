import { Router } from "express";
import { LoginTask, RegisterTask } from "../controller/Auth";
import { check } from "express-validator";

const router = Router();

/**
 * Register route
 */
/**
 * @swagger
 * /auth:
 *      post:
 *          summary: for registration
 *          tags:
 *              - Authorization
 *          description: this api is used to register
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              email:
 *                                  type: email
 *                                  example: anjitpariyar@gmail.com
 *                              password:
 *                                  type: string
 *                                  example: string
 *                              role:
 *                                  type: number
 *                                  example: 1
 *          responses:
 *              201:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                              schema:
 *                                  type: object
 *                                  properties:
 *                                      email:
 *                                          type: email
 *                                          example: anjitpariyar@gmail.com
 *                                      avatarUrl:
 *                                          type: string
 *                                          example: https://res.cloudinary.com/dem2xvk2e/image/upload/v1682476653/chat/qfemlneebclcpd2pwi2h.png
 *                                      role:
 *                                          type: number
 *                                          example: 1
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
