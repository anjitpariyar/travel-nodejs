import { Request, Response } from "express";
import Destination from "../model/Destination.modal";
import ResponseObj from "./Response";
import respPagination from "./respPagination";
require("dotenv").config();

export const getDestination = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.query;

    const destination = categoryId
      ? await Destination.find({ categoryId })
      : await Destination.find();
    if (Destination.length === 0) {
      const paginate = new respPagination(0, 0, 0);
      const responseObj = new ResponseObj(200, {}, paginate, "No Data");
      return res.status(200).send(responseObj);
    }
    const paginate = new respPagination(0, 0, 0);
    const responseObj = new ResponseObj(200, destination, paginate, "Data");
    return res.status(200).send(responseObj);
  } catch (error) {
    let errorObject: object = {};
    if (error instanceof Error) errorObject = error;
    let resData = new ResponseObj(500, errorObject, {}, "Something went wrong");
    return res.send(resData);
  }
};

export const getDestinationByID = async (req: Request, res: Response) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (destination === null) {
      let resData = new ResponseObj(200, {}, {}, "Empty data");
      return res.send(resData);
    } else {
      const responseObj = new ResponseObj(200, destination, {}, "Data");
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