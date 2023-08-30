import { Request, Response } from "express";
import ResponseObj from "./Response";
import Category, { ICategory } from "../model/Category.model";
import { validationResult } from "express-validator";
import Auth from "../model/Auth.model";

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

export const categoryAdd = async (req: Request, res: Response) => {
  const data: ICategory[] = req.body;

  // ... (remaining code)

  const promises = data.map(async function (item) {
    let errors = validationResult(item);

    if (!errors.isEmpty()) {
      let respObject = new ResponseObj(
        400,
        errors,
        {},
        "Validations error occured"
      );
      return respObject; // Return the error response
    }

    let newCategory = new Category();
    newCategory.name = item.name;
    newCategory.icon = item.icon;
    newCategory.backgroundImage = item.backgroundImage;
    newCategory.about = item.about;

    try {
      let response = await newCategory.save();
      if (response) {
        let resData = new ResponseObj(
          200,
          item,
          {},
          "category added successfully"
        );
        return resData;
      }
    } catch (error) {
      console.log("error", error);
      let errorObject: object = {};
      if (error instanceof Error) errorObject = error;
      let resData = new ResponseObj(
        400,
        errorObject,
        {},
        "Failed to add new category"
      );
      return resData; // Return the error response
    }
  });

  try {
    const results = await Promise.all(promises);
    return res.send(results);
  } catch (error) {
    return res.send(error);
  }
};
