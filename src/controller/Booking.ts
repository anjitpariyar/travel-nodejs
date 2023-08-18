import Auth, { IAuth, IInterest, IVisitedLocation } from "../model/Auth.model";
import Category from "../model/Category.model";
import Hotels from "../model/Hotels.modal";
import Destination from "../model/Destination.modal";
import ResponseObj from "./Response";
import { Response, Request } from "express";
import { validationResult } from "express-validator";

const mongoose = require("mongoose");

export const PostBooking = async (req: Request, res: Response) => {
  let {
    status,
    type,
    startDate,
    paymentMethod,
    payment,
    fullName,
    contact,
    email,
    roomType,
    endDate,
  } = req.body;
  const hotelId = req.params.id;
  const userId = req.user.id;

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

  // tokem validation
  let profile = await Auth.findOne({ _id: userId });

  if (!profile) {
    const respObject = new ResponseObj(404, {}, {}, "Profile not found");
    return res.status(404).send(respObject);
  }

  if (status === "request") {
    // check if hotel exists or not
    try {
      if (type === "hotel") {
        await Hotels.findById(hotelId);
      } else {
        await Hotels.findById(hotelId);
      }
    } catch (error) {
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
  }

  let respObject = new ResponseObj(200, {}, {}, "testing");
  return res.status(200).send(respObject);
};

/**
 * Fetch the profile
 */
export const GetBooking = async (req: Request, res: Response) => {
  //finding if profile exist
  let profile = await Auth.findOne({ _id: req.user.id });

  if (!profile) {
    const respObject = new ResponseObj(404, {}, {}, "Profile not found");
    return res.status(404).send(respObject);
  }

  // Convert booked object IDs to strings
  if (profile.booked && profile.booked.length > 0) {
    const bookedDetails = await Hotels.find({
      _id: { $in: profile.booked.map((id) => mongoose.Types.ObjectId(id)) },
    }).select("name gallery");

    const bookedIds: IVisitedLocation[] = bookedDetails.map((detail) => ({
      id: detail._id.toString(),
      name: detail.name,
      gallery: detail.gallery,
    }));
    profile.booked = bookedIds;
  }

  // Convert interest object IDs to strings
  if (profile.interest && profile.interest.length > 0) {
    const interestDetails = await Category.find({
      _id: { $in: profile.interest.map((id) => mongoose.Types.ObjectId(id)) },
    }).select("name");

    const interestIds: IInterest[] = interestDetails.map((detail) => ({
      id: detail._id.toString(),
      name: detail.name,
    }));
    profile.interest = interestIds;
  }

  // Convert interest object IDs to strings
  if (profile.visitedLocation && profile.visitedLocation.length > 0) {
    const visitedLocationDetails = await Destination.find({
      _id: {
        $in: profile.visitedLocation.map((id) => mongoose.Types.ObjectId(id)),
      },
    }).select("name");

    const visitedLocationIds: IVisitedLocation[] = visitedLocationDetails.map(
      (detail) => ({
        id: detail._id.toString(),
        name: detail.name,
        gallery: detail.gallery,
      })
    );
    profile.visitedLocation = visitedLocationIds;
  }

  // Omit sensitive fields and send the response
  const sanitizedProfile = {
    ...profile.toObject(),
    _id: undefined,
    password: undefined,
  };

  let respObject = new ResponseObj(200, sanitizedProfile, {}, "Profile found");
  return res.status(200).send(respObject);
};
