import Auth from "../model/Auth.model";
import Hotels from "../model/Hotels.modal";
import Booking from "../model/Booking.model";
import ResponseObj from "./Response";
import { Response, Request } from "express";
import { validationResult } from "express-validator";
const dayjs = require("dayjs");

// this is design for hotel only
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

  // token validation
  let profile = await Auth.findOne({ _id: userId });

  if (!profile) {
    const respObject = new ResponseObj(404, {}, {}, "Profile not found");
    return res.status(404).send(respObject);
  }

  if (status === "request") {
    // check if hotel exists or not
    try {
      await Hotels.findById(hotelId);
      // create new booking
      let newBooking = new Booking();
      newBooking.hid = hotelId;
      newBooking.startDate = startDate;
      newBooking.paymentMethod = paymentMethod;
      newBooking.payment = payment;
      newBooking.fullName = fullName;
      newBooking.email = email;
      newBooking.endDate = endDate;
      newBooking.status = status;
      newBooking.type = type;
      newBooking.roomType = roomType;
      newBooking.contact = contact;
      newBooking.isRead = false;
      newBooking.uid = userId;
      await newBooking.save();
      let resObj = {
        message: "success",
      };
      let resData = new ResponseObj(
        200,
        resObj,
        {},
        "booking requested successfully"
      );
      return res.send(resData);
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

  let respObject = new ResponseObj(400, {}, {}, "permission denied");
  return res.status(400).send(respObject);
};

/**
 * Fetch the profile
 */
export const GetBooking = async (req: Request, res: Response) => {
  //finding if profile exist
  let profile = await Auth.findOne({ _id: req.user.id });

  if (!profile) {
    const respObject = new ResponseObj(404, {}, {}, "booking not found");
    return res.status(404).send(respObject);
  }

  let query: { uid?: string } = {};
  if (profile.role === 1) {
    query.uid = req.user.id;
  }

  // for normal user

  let bookedHotels = await Booking.find(query);
  // Prepare an array to store the combined data
  const combinedData = [];
  if (bookedHotels.length === 0) {
    let respObject = new ResponseObj(400, {}, {}, "no data");
    res.send(respObject);
  } else {
    // Iterate through each booked hotel
    for (const booking of bookedHotels) {
      const { hid } = booking;

      // Fetch hotel data from Hotels collection based on hid
      const hotel = await Hotels.findOne({ _id: hid });

      // If hotel data is found, combine the booking and hotel data
      if (hotel) {
        combinedData.push({
          booking: {
            ...booking.toObject(),
            isExpired: dayjs(booking.endDate).isBefore(dayjs()),
          },
          hotel: {
            id: hotel.id,
            name: hotel.name,
            gallery: hotel.gallery,
            about: hotel.about,
            rate: hotel.rate,
            price: hotel.price,
            url: hotel.url,
          },
        });
      }
    }
  }

  let respObject = new ResponseObj(200, combinedData, {}, "Booking found");
  return res.status(200).send(respObject);
};

export const UpdatingBooking = async (req: Request, res: Response) => {
  let { status, payment, roomNumber } = req.body;
  const bookingId = req.params.id;
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

  // token validation
  let profile = await Auth.findOne({ _id: userId });

  if (!profile) {
    const respObject = new ResponseObj(404, {}, {}, "Profile not found");
    return res.status(404).send(respObject);
  }

  // allow for cancelling
  if (profile.role == 1 && status === "cancel") {
    // check if hotel exists or not
    try {
      const updatedBooking = await Booking.findByIdAndUpdate(
        bookingId,
        { status: status },
        { new: true } // This option returns the updated document
      );
      let resData = new ResponseObj(
        200,
        updatedBooking,
        {},
        `booking updated to ${status} successfully`
      );
      return res.send(resData);
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
  } else if (
    profile.role == 2 &&
    (status === "booked" || status === "canceled")
  ) {
    // check if hotel exists or not
    let query: any = {
      status: status,
    };

    if (payment) {
      query.payment = payment;
    }
    if (roomNumber) {
      query.roomNumber = roomNumber;
    }

    try {
      const updatedBooking = await Booking.findByIdAndUpdate(
        bookingId,
        query,
        { new: true } // This option returns the updated document
      );
      let resData = new ResponseObj(
        200,
        updatedBooking,
        {},
        `booking updated to ${status} successfully`
      );
      return res.send(resData);
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

  let respObject = new ResponseObj(200, {}, {}, "permission denied");
  return res.status(400).send(respObject);
};
