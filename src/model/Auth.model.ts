import mongoose from "mongoose";

/**
 * A model for the user authentication
 */
export interface IAuth extends mongoose.Document {
  email: string;
  password: string;
  role: string;
  username?: string;
  avatarUrl?: string;
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
      type: Number,
      required: true,
      default: 1, // 0 = admin (Default), 1 = nirmal user, 2 = hotel vendor
    },
    avatarUrl: {
      type: String,
      default:
        "https://res.cloudinary.com/dem2xvk2e/image/upload/v1682476653/chat/qfemlneebclcpd2pwi2h.png",
    },
  },
  { timestamps: true }
);

export default mongoose.model<IAuth>("Auth", AuthSchema);
