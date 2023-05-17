import { Request, Response } from "express";
import ResponseObj from "./Response";
import Category from "../model/Category.model";

export const getCategory = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find().select("name icon");
    if (categories.length === 0) {
      const responseObj = new ResponseObj(200, {}, {}, "No Data");
      return res.status(200).send(responseObj);
    }
    const responseObj = new ResponseObj(200, categories, {}, "Data");
    return res.status(200).send(responseObj);
  } catch (error) {
    let errorObject: object = {};
    if (error instanceof Error) errorObject = error;
    let resData = new ResponseObj(500, errorObject, {}, "Something went wrong");
    return res.send(resData);
  }
};

export const getCategoryByID = async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category === null) {
      let resData = new ResponseObj(200, {}, {}, "Empty data");
      return res.send(resData);
    } else {
      const responseObj = new ResponseObj(200, category, {}, "Data");
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
