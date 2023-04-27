import { Router } from "express";
import { LoginTask, RegisterTask } from "../controller/Auth";
import { check } from "express-validator";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 *
 *
 *
 */

/**
 * @swagger
 * /auth:
 *      post:
 *          summary: for registration
 *          tags: [Auth]
 *          produces:
 *            - application/json
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

/**
 * @swagger
 * /auth/login:
 *      post:
 *          summary: for login
 *          tags: [Auth]
 *          produces:
 *            - application/json
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
 *          responses:
 *              201:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                              schema:
 *                                  type: object
 *                                  properties:
 *                                      data:
 *                                         type: object
 *                                         properties:
 *                                           access_token:
 *                                             type: string
 *                                           user:
 *                                             type: object
 *                                             properties:
 *                                               _id:
 *                                                 type: string
 *                                               email:
 *                                                 type: string
 *                                               role:
 *                                                 type: integer
 *                                               avatarUrl:
 *                                                 type: string
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 */

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

export default router;
