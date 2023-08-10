import { Request, Response } from "express";
import Hotels from "../model/Hotels.modal";
import ResponseObj from "./Response";
import respPagination from "./respPagination";
import Auth from "../model/Auth.model";
import jwt from "jsonwebtoken";

require("dotenv").config();

export const getHotels = async (req: Request, res: Response) => {
  const token = req?.header("x-auth-token");
  let userId;

  if (token) {
    // decode
    try {
      await jwt.verify(
        token,
        process.env.mySecret!,
        (error: any, decoded: any) => {
          if (error) {
            let respObject = new ResponseObj(
              401,
              {},
              {},
              "Token is not valid or is expired"
            );
            return res.status(401).send(respObject);
          } else {
            userId = decoded.user;
          }
        }
      );
    } catch (err) {
      let respObject = new ResponseObj(500, {}, {}, "Server Error");
      return res.status(500).send(respObject);
    }
  }

  try {
    const hotels = await Hotels.find();
    if (Hotels.length === 0) {
      const paginate = new respPagination(0, 0, 0);
      const responseObj = new ResponseObj(200, {}, paginate, "No Data");
      return res.status(200).send(responseObj);
    }
    const paginate = new respPagination(0, 0, 0);

    const hotelsWithIsLiked = hotels.map((hotel) => {
      const isLiked = userId ? hotel.liked.includes(userId.id) : false;
      return {
        ...hotel.toObject(),
        isLiked: isLiked,
      };
    });

    const responseObj = new ResponseObj(
      200,
      hotelsWithIsLiked,
      paginate,
      "Data"
    );
    return res.status(200).send(responseObj);
  } catch (error) {
    let errorObject: object = {};
    if (error instanceof Error) errorObject = error;
    let resData = new ResponseObj(500, errorObject, {}, "Something went wrong");
    return res.send(resData);
  }
};

export const getHotelsByID = async (req: Request, res: Response) => {
  try {
    const hotel = await Hotels.findById(req.params.id);
    if (hotel === null) {
      let resData = new ResponseObj(200, {}, {}, "Empty data");
      return res.send(resData);
    } else {
      const responseObj = new ResponseObj(200, hotel, {}, "Data");
      return res.send(responseObj);
    }
  } catch (error) {
    console.log("error", error);
    let errorObject: object = {};
    if (error instanceof Error) errorObject = error;
    let resData = new ResponseObj(
      500,
      errorObject,
      {},
      error?.data?.message ?? "Something went wrong"
    );
    return res.send(resData);
  }
};

export const getSavedHotels = async (req: Request, res: Response) => {
  try {
    const hotel = await Hotels.find({ liked: { $in: [req.user.id] } });
    if (hotel === null) {
      let resData = new ResponseObj(200, {}, {}, "Empty data");
      return res.send(resData);
    } else {
      const responseObj = new ResponseObj(200, hotel, {}, "Data");
      return res.send(responseObj);
    }
  } catch (error) {
    console.log("error", error);
    let errorObject: object = {};
    if (error instanceof Error) errorObject = error;
    let resData = new ResponseObj(
      500,
      errorObject,
      {},
      error?.data?.message ?? "Something went wrong"
    );
    return res.send(resData);
  }
};

export const toggleHotelsByID = async (req: Request, res: Response) => {
  //finding if profile exist
  let profile = await Auth.findOne({ _id: req.user.id });

  if (!profile) {
    const respObject = new ResponseObj(404, {}, {}, "Profile not found");
    return res.status(404).send(respObject);
  }

  try {
    const hotel = await Hotels.findById(req.params.id);
    if (hotel === null) {
      let resData = new ResponseObj(200, {}, {}, "Empty data");
      return res.send(resData);
    } else {
      // check if user have liked this or not
      const liked: string[] = hotel.liked || [];

      if (liked.includes(req.user.id)) {
        // remove from like here
        var index = liked.indexOf(req.user.id);
        if (index > -1) {
          liked.splice(index, 1);
        }
      } else {
        // add userid here
        liked.push(req.user.id);
      }

      await Hotels.updateOne(
        { _id: req.params.id },
        { $set: { liked: liked } }
      );

      const responseObj = new ResponseObj(
        200,
        { message: "success" },
        {},
        "Data"
      );
      return res.send(responseObj);
    }
  } catch (error) {
    console.log("error", error);
    let errorObject: object = {};
    if (error instanceof Error) errorObject = error;
    let resData = new ResponseObj(
      500,
      errorObject,
      {},
      error?.data?.message ?? "Something went wrong"
    );
    return res.send(resData);
  }
};
