import Auth, { IAuth } from "../model/Auth.model";
import { validationResult } from "express-validator";
import ResponseObj from "./Response";
import { Response, Request } from "express";
// import cloudinary from "cloudinary";

//Cloudinary config
// cloudinary.v2.config({
//   cloud_name: process.env.cloudName,
//   api_key: process.env.apiKey,
//   api_secret: process.env.apiSecret,
// });

/**
 * Creates a profile
 */

/**
 * Edit a profile
 */
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

  //New pbject for updated fields
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

/**
 * Upload DP
 */
// export const UploadDP = async (req: Request, res: Response) => {
//   //Getting image
//   const imagedata = req.files.image;
//   //Folder
//   let location: string = "petgram/profile";

//   /**
//    * Finding if the profile is existing
//    */
//   let findOldDp = await Profile.findOne({ authId: req.user.id });
//   if (!findOldDp) {
//     // There is not profile added
//     // So we need to insert dp creating the profile object
//     let profilewithDP = new Profile();

//     //Uploading to Cloudinary
//     cloudinary.v2.uploader.upload(
//       imagedata.path,
//       {
//         folder: location,
//         use_filename: true,
//       },
//       async (error: any, result: any) => {
//         if (result) {
//           let imageObjects = {
//             _id: result.public_id,
//             url: result.url,
//             secure_url: result.secure_url,
//             width: result.width,
//             height: result.height,
//           };

//           profilewithDP.authId = req.user.id; //Setting user id
//           profilewithDP.avatar = imageObjects; //Setting the avatar object

//           /**
//            * Updating image fields in the profile objects
//            */
//           //New pbject for updated fields
//           try {
//             await profilewithDP.save();
//             let respObject = new ResponseObj(
//               200,
//               imageObjects,
//               {},
//               "DP Added Successfully"
//             );
//             return res.status(200).send(respObject);
//           } catch (error) {
//             let errorObject: object = {};
//             if (error instanceof Error) errorObject = error;
//             let resData = new ResponseObj(
//               400,
//               errorObject,
//               {},
//               "Dp Adding Error"
//             );
//             return res.status(400).send(resData);
//           }
//         } else {
//           let respObject = new ResponseObj(
//             400,
//             {},
//             {},
//             "Error Occured while uploading."
//           );
//           return res.status(400).send(respObject);
//         }
//       }
//     );
//   } else {
//     /**
//      * Finding if there is older dp to delete it
//      */
//     if ("avatar" in findOldDp) {
//       // Deleting the older profile picture
//       cloudinary.v2.uploader.destroy(
//         findOldDp.avatar._id,
//         async (error: any, result: any) => {
//           if (result) {
//             //Uploading to Cloudinary
//             cloudinary.v2.uploader.upload(
//               imagedata.path,
//               {
//                 folder: location,
//                 use_filename: true,
//               },
//               async (error: any, result: any) => {
//                 if (result) {
//                   let imageObjects: object = {
//                     _id: result.public_id,
//                     url: result.url,
//                     secure_url: result.secure_url,
//                     width: result.width,
//                     height: result.height,
//                   };

//                   /**
//                    * Updating image fields in the profile objects
//                    */
//                   //New pbject for updated fields
//                   try {
//                     await Profile.findOneAndUpdate(
//                       { authId: req.user.id },
//                       { $set: { avatar: imageObjects } },
//                       { new: true }
//                     );
//                     let respObject = new ResponseObj(
//                       200,
//                       imageObjects,
//                       {},
//                       "DP Update Success"
//                     );
//                     return res.status(200).send(respObject);
//                   } catch (error) {
//                     let errorObject: object = {};
//                     if (error instanceof Error) errorObject = error;
//                     let resData = new ResponseObj(
//                       400,
//                       errorObject,
//                       {},
//                       "Profile Update Error"
//                     );
//                     return res.send(resData);
//                   }
//                 } else {
//                   let respObject = new ResponseObj(
//                     400,
//                     {},
//                     {},
//                     "Error Occured while uploading."
//                   );
//                   return res.status(400).send(respObject);
//                 }
//               }
//             );
//           } else {
//             let respObject = new ResponseObj(
//               400,
//               error,
//               {},
//               "Image Delete Failed"
//             );
//             return res.status(400).send(respObject);
//           }
//         }
//       );
//     } else {
//       //Checking files is send or not
//       if (!imagedata) {
//         let respObject = new ResponseObj(405, {}, {}, "PLease send Image");
//         return res.status(405).send(respObject);
//       }

//       //Uploading to Cloudinary
//       cloudinary.v2.uploader.upload(
//         imagedata.path,
//         {
//           folder: location,
//           use_filename: true,
//         },
//         async (error: any, result: any) => {
//           if (result) {
//             let imageObjects: object = {
//               _id: result.public_id,
//               url: result.url,
//               secure_url: result.secure_url,
//               width: result.width,
//               height: result.height,
//             };

//             /**
//              * Updating image fields in the profile objects
//              */
//             //New pbject for updated fields
//             try {
//               await Profile.findOneAndUpdate(
//                 { _id: req.user.id },
//                 { $set: { avatar: imageObjects } },
//                 { new: true }
//               );
//               let respObject = new ResponseObj(
//                 200,
//                 imageObjects,
//                 {},
//                 "DP Update Success"
//               );
//               return res.status(200).send(respObject);
//             } catch (error) {
//               let errorObject: object = {};
//               if (error instanceof Error) errorObject = error;
//               let resData = new ResponseObj(
//                 400,
//                 errorObject,
//                 {},
//                 "Profile Update Error"
//               );
//               return res.send(resData);
//             }
//           } else {
//             let respObject = new ResponseObj(
//               400,
//               {},
//               {},
//               "Error Occured while uploading."
//             );
//             return res.status(400).send(respObject);
//           }
//         }
//       );
//     }
//   }
// };
