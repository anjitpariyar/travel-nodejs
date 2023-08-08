import Auth, { IAuth } from "../model/Auth.model";
import { validationResult } from "express-validator";
import ResponseObj from "./Response";
import { Response, Request } from "express";

export const EditProfileTask = async (req: Request, res: Response) => {
  let {
    email,
    fullName,
    avatarUrl,
    bio,
    gender,
    dob,
    address,
    contact,
    interest,
    visitedLocation,
    booked,
  } = req.body;

  let profile = new Auth();

  //New object for updated fields
  let newProfile = {} as IAuth;
  if (email) newProfile.email = email;
  if (fullName) newProfile.fullName = fullName;
  if (avatarUrl) newProfile.avatarUrl = avatarUrl;
  if (address) newProfile.address = address;
  if (contact) newProfile.contact = contact;
  if (bio) newProfile.bio = bio;
  if (gender) newProfile.gender = gender;
  if (dob) newProfile.dob = dob;
  if (interest) {
    newProfile.interest = interest;
  }
  if (visitedLocation) {
    newProfile.visitedLocation = visitedLocation;
  }
  if (booked) {
    newProfile.booked = booked;
  }

  try {
    let findUser = await Auth.findById(req.user.id);
    if (!findUser) {
      let respObject = new ResponseObj(400, newProfile, {}, "User not found");
      res.send(respObject);
    } else {
      profile = await Auth.findOneAndUpdate(
        { authId: req.user.id },
        { $set: newProfile },
        { new: true }
      );
      let respObject = new ResponseObj(
        200,
        profile,
        {},
        "Profile Update Success"
      );
      return res.status(200).send(respObject);
    }
  } catch (error) {
    let errorObject: object = {};
    if (error instanceof Error) errorObject = error;
    let resData = new ResponseObj(400, errorObject, {}, "Profile Update Error");
    return res.send(resData);
  }
};

/**
 * Fetch the profile
 */
export const GetProfile = async (req: Request, res: Response) => {
  //finding if profile exist
  let profile = await Auth.findOne({ _id: req.user.id });
  if (!profile) {
    let respObject = new ResponseObj(404, {}, {}, "Profile not found");
    return res.status(404).send(respObject);
  }

  let respObject = new ResponseObj(200, profile, {}, "Profile found");
  return res.status(200).send(respObject);
};
