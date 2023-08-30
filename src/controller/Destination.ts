import { Request, Response } from "express";
import Destination, { IDestination } from "../model/Destination.modal";
import ResponseObj from "./Response";
import respPagination from "./respPagination";
import { processLocations } from "../utils";
import Auth from "../model/Auth.model";
import { validationResult } from "express-validator";

require("dotenv").config();

export const getDestination = async (req: Request, res: Response) => {
  try {
    const { categoryId, name } = req.query;

    const destination = categoryId
      ? await Destination.find({ location: categoryId })
      : await Destination.find();
    if (destination.length === 0) {
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

// this response is fucked up. it generally give cities list but for search give differ
export const getDestinationByLocation = async (req: Request, res: Response) => {
  try {
    const destination = await Destination.aggregate([
      {
        $group: {
          _id: null,
          locations: { $addToSet: "$location" },
        },
      },
      {
        $project: {
          _id: 0,
          locations: 1,
        },
      },
    ]);
    if (destination.length === 0) {
      const paginate = new respPagination(0, 0, 0);
      const responseObj = new ResponseObj(200, {}, paginate, "No Data");
      return res.status(200).send(responseObj);
    }
    const paginate = new respPagination(0, 0, 0);
    const newLocation = processLocations(destination[0].locations);
    const responseObj = new ResponseObj(200, newLocation, paginate, "Data");
    return res.status(200).send(responseObj);
  } catch (error) {
    let errorObject: object = {};
    if (error instanceof Error) errorObject = error;
    let resData = new ResponseObj(500, errorObject, {}, "Something went wrong");
    return res.send(resData);
  }
};

export const SearchDestination = async (req: Request, res: Response) => {
  try {
    const { location, name } = req.query;

    const destination = await Destination.find({
      location: location
        ? { $regex: new RegExp(location as string, "i") }
        : /.*/,
      name: name ? { $regex: new RegExp(name as string, "i") } : /.*/,
    });
    if (destination.length === 0) {
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

// add destination in block
export const AddDestinations = async (req: Request, res: Response) => {
  const data: IDestination[] = req.body;

  //finding if profile exist
  let profile = await Auth.findOne({ _id: req.user.id });

  if (!profile) {
    const respObject = new ResponseObj(404, {}, {}, "booking not found");
    return res.status(404).send(respObject);
  }
  if (profile.role !== 0) {
    let respObject = new ResponseObj(200, {}, {}, "permission denied");
    return res.status(400).send(respObject);
  }

  const promises = data.map(async function (item) {
    let errors = validationResult(item);
    if (!errors.isEmpty()) {
      let respObject = new ResponseObj(
        400,
        errors,
        {},
        "Validations error occurred"
      );
      throw respObject;
    }

    let found = await Destination.findOne({ pid: item.pid });

    if (found) {
      let resData = new ResponseObj(409, {}, {}, "Destination already Added");
      throw resData;
    }

    let newDestination = new Destination();
    newDestination.pid = item.pid;
    newDestination.name = item.name;
    newDestination.location = item.location;
    newDestination.price = item.price;
    newDestination.about = item.about;
    newDestination.gallery = item.gallery;
    newDestination.feature = item.feature;
    newDestination.highlight = item.highlight;
    newDestination.extra = item.extra;
    newDestination.itinerary = item.itinerary;
    newDestination.reviews = item.reviews;
    newDestination.rate = item.rate;
    newDestination.url = item.url;
    newDestination.categoryId = item.categoryId;

    try {
      await newDestination.save();
      let resData = new ResponseObj(
        200,
        newDestination,
        {},
        "Destination added successfully"
      );
      return resData;
    } catch (error) {
      let errorObject: object = {};
      if (error instanceof Error) errorObject = error;
      let resData = new ResponseObj(
        400,
        errorObject,
        {},
        "Failed to add new Destination"
      );
      throw resData;
    }
  });
  try {
    const results = await Promise.all(promises);
    return res.status(200).send(results);
  } catch (error) {
    return res.status(400).send(error);
  }
};
