import mongoose from "mongoose";

/**
 * A model for the user authentication
 */
const Schema = mongoose.Schema;

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
export interface IAuth extends mongoose.Document {
  email: string;
  password: string;
  role: string;
  avatarUrl?: string;
  fullName: string;
  gender?: string;
  dob?: string;
  address?: string;
  contact?: string;
  interest?: string[];
  visitedLocation?: string[];
  booked?: string[];
  bio?: string;
}

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

const AuthSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      required: true,
      default: 1, // 0 = admin (Default), 1 = normal user, 2 = hotel vendor
    },
    avatarUrl: {
      type: String,
      default:
        "https://res.cloudinary.com/dem2xvk2e/image/upload/v1682476653/chat/qfemlneebclcpd2pwi2h.png",
    },
    bio: { type: String, required: false },
    gender: { type: String, required: false },
    dob: { type: String, required: false },
    address: { type: String, required: false },
    contact: { type: String, required: false },
    interest: { type: [interestSchema], required: false },
    visitedLocation: { type: [visitedLocationSchema], required: false },
    booked: { type: [visitedLocationSchema], required: false },
  },
  { timestamps: true }
);

export default mongoose.model<IAuth>("Auth", AuthSchema);
