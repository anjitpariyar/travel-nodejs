import mongoose from "mongoose";

/**
 * A model for the user profile
 */
interface IInterest {
  id: string;
  name: string;
}
interface IVisitedLocation {
  id: string;
  imageSrc: string;
  name: string;
  rating: string;
}

export interface IProfile extends mongoose.Document {
  authId: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  bio: string;
  gender: string;
  dob: string;
  address: string;
  contact: string;
  interest: IInterest[];
  visitedLocation: IVisitedLocation[];
  liked: IVisitedLocation[];
  booked: IVisitedLocation[];
}

const Schema = mongoose.Schema;

// Define the sub-schemas for IInterest and IVisitedLocation
const interestSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
});

const visitedLocationSchema = new Schema({
  id: { type: String, required: true },
  imageSrc: { type: String, required: true },
  name: { type: String, required: true },
  rating: { type: String, required: true },
});

// Define the main schema for IProfile
const ProfileSchema = new Schema(
  {
    authId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    avatarUrl: { type: String, required: true },
    bio: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    interest: { type: [interestSchema], required: true },
    visitedLocation: { type: [visitedLocationSchema], required: true },
    liked: { type: [visitedLocationSchema], required: true },
    booked: { type: [visitedLocationSchema], required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IProfile>("Profile", ProfileSchema);
