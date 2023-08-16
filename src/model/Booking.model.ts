import mongoose from "mongoose";

/**
 * A model for the post hotel database
 */

export interface IBooking extends mongoose.Document {
  pid: string;
  date: Date;
  paymentMethod: "online" | "cod";
  payment?: number;
  // user
  fullName: string;
  contact: number;
  email: string;
  roomType: string;
  days: "";
}

const BookingSchema = new mongoose.Schema(
  {
    pid: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["online", "cod"],
      required: true,
    },
    payment: {
      type: Number,
    },
    fullName: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    roomType: {
      type: String,
      required: true,
    },
    days: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IBooking>("Hotels", BookingSchema);
