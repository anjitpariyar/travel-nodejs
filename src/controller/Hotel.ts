import { Request, Response } from "express";
import Hotels from "../model/Hotels.modal";
import ResponseObj from "./Response";
import respPagination from "./respPagination";
require("dotenv").config();

export const getHotels = async (req: Request, res: Response) => {
  try {
    const hotels = await Hotels.find();
    if (Hotels.length === 0) {
      const paginate = new respPagination(0, 0, 0);
      const responseObj = new ResponseObj(200, {}, paginate, "No Data");
      return res.status(200).send(responseObj);
    }
    const paginate = new respPagination(0, 0, 0);
    const responseObj = new ResponseObj(200, hotels, paginate, "Data");
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
