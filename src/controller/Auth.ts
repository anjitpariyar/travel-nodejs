import Auth from "../model/Auth.model";
import ResponseObj from "./Response";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

/**
 * This task is for registering a new user
 * @returns
 */
export const RegisterTask = async (req: Request, res: Response) => {
  let { email, password } = req.body;
  //Checking validations
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    let respObject = new ResponseObj(
      400,
      errors,
      {},
      "Validations error occured"
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

  /**
   * Generating salt
   */
  let salt = await bcrypt.genSalt(10);
  //Hashing the password
  newUser.password = await bcrypt.hash(password, salt);
  /**
   * Generating token for the activation link
   */
  let token = jwt.sign({ expiresIn: 360000 }, process.env.mySecret!);

  /**
   * Saving to database
   */
  try {
    await newUser.save();
    let resData = new ResponseObj(
      200,
      newUser,
      {},
      "Confirm link is sent to mail"
    );
    //SendActivationMail(newUser._id, token, newUser.email);
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
      "Validations error occured"
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
      let responsObj = new ResponseObj(
        401,
        {},
        {},
        "Sorry, Password did not matched. Please try again."
      );
      return res.status(401).send(responsObj);
    }

    let access_token = jwt.sign(
      { user: { id: findUser._id } },
      process.env.mySecret!,
      { expiresIn: 3600000 }
    );

    //Object for sending data to response
    let userData = {
      _id: findUser._id,
      email: findUser.email,
      username: findUser.username,
      role: findUser.role,
    };
    let resData = {
      access_token: access_token,
      user: userData,
    };
    let respObject = new ResponseObj(200, resData, {}, "Login Successfull");
    return res.status(200).send(respObject);
  } catch (error) {
    let errorObject: object = {};
    if (error instanceof Error) errorObject = error;
    let responseObj = new ResponseObj(500, errorObject, {}, "Server Error");
    return res.status(500).send(responseObj);
  }
};
