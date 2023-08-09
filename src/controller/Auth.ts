// lib
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { Request, Response } from "express";
import dotenv from "dotenv";
import gravatar from "gravatar";
// comp
import Auth from "../model/Auth.model";
import ResponseObj from "./Response";

dotenv.config();

/**
 * This task is for registering a new user
 * @returns
 */
export const RegisterTask = async (req: Request, res: Response) => {
  let { email, password, role, fullName } = req.body;
  //Checking validations
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    let respObject = new ResponseObj(
      400,
      errors,
      {},
      "Validations error occurred"
    );
    return res.status(400).send(respObject);
  }
  /**
   * Checking if the email is already existing
   */
  let found = await Auth.findOne({ email });
  if (found) {
    let resData = new ResponseObj(409, {}, {}, "Email already Taken");
    return res.status(409).send(resData);
  }
  /**
   * Creating the new user object with the body request
   */
  let newUser = new Auth();
  newUser.email = email;
  newUser.role = role;
  newUser.fullName = fullName;
  newUser.avatarUrl = gravatar.url(email, {
    s: "56",
    r: "pg",
    d: "https://res.cloudinary.com/dem2xvk2e/image/upload/v1682476653/chat/qfemlneebclcpd2pwi2h.png",
  });

  /**
   * Generating salt
   */
  let salt = await bcrypt.genSalt(10);
  //Hashing the password
  newUser.password = await bcrypt.hash(password, salt);

  /**
   * Saving to database
   */

  try {
    await newUser.save();
    let resObj = {
      email: newUser.email,
      role: newUser.role,
      avatarUrl: newUser.avatarUrl,
      fullName: newUser.fullName,
    };
    let resData = new ResponseObj(
      200,
      resObj,
      {},
      "account created successfully"
    );
    return res.send(resData);
  } catch (error) {
    let errorObject: object = {};
    if (error instanceof Error) errorObject = error;
    let resData = new ResponseObj(400, errorObject, {}, "User save failed");
    return res.send(resData);
  }
};

/**
 * The login task
 */
export const LoginTask = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  //Checking validations
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    let respObject = new ResponseObj(
      400,
      errors,
      {},
      "Validations error occurred"
    );
    return res.status(400).send(respObject);
  }

  /**
   * Finding the user
   */
  try {
    let findUser = await Auth.findOne({ email: email });
    if (!findUser) {
      let responseObj = new ResponseObj(
        404,
        {},
        {},
        "Sorry, The user was not found. Please check again."
      );
      return res.status(404).send(responseObj);
    }

    //Finally checking the password
    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
      let responseObj = new ResponseObj(
        401,
        {},
        {},
        "Sorry, Password did not matched. Please try again."
      );
      return res.status(401).send(responseObj);
    }

    let access_token = jwt.sign(
      { user: { id: findUser._id } },
      process.env.mySecret!,
      { expiresIn: 3600000 }
    );

    // console.log("access token: ", access_token);
    //Object for sending data to response
    let userData = {
      _id: findUser._id,
      email: findUser.email,
      fullName: findUser.fullName,
      role: findUser.role,
      avatarUrl: findUser.avatarUrl,
    };
    // console.log("userData", userData);
    let resData = {
      access_token: access_token,
      user: userData,
    };
    let respObject = new ResponseObj(200, resData, {}, "Login Successful");
    return res.status(200).send(respObject);
  } catch (error) {
    console.log("error", error);
    let errorObject: object = {};
    if (error instanceof Error) errorObject = error;
    let responseObj = new ResponseObj(500, errorObject, {}, "Server Error");
    return res.status(500).send(responseObj);
  }
};
