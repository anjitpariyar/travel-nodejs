import mongoose from "mongoose";

/**
 * A model for the user authentication
 */
export interface IAuth extends mongoose.Document {
  email: string;
  password: string;
  role: string;
  username?: string;
}
const AuthSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 1, // 0 = admin (Default), 1 = nirmal user, 2 = hotel vendor
    },
  },
  { timestamps: true }
);

export default mongoose.model<IAuth>("Auth", AuthSchema);
