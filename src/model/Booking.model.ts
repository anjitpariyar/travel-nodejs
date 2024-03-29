import mongoose from "mongoose";

/**
 * A model for the post hotel database
 */

export interface IBooking extends mongoose.Document {
  hid: string;
  startDate: Date;
  paymentMethod: "online" | "cod";
  payment?: number;
  // user
  fullName: string;
  contact: number;
  email: string;
  roomType: string;
  endDate: Date;
  status: "request" | "booked" | "cancel" | "canceled";
  type: "hotel" | "destination";
  isRead: boolean;
  uid: string;
  roomNumber?: number;
}

const BookingSchema = new mongoose.Schema(
  {
    hid: {
      type: String,
      required: true,
    },
    uid: {
      type: String,
      required: true,
    },
    startDate: {
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
    roomNumber: {
      type: Number,
      required: false,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["request", "booked", "cancel", "canceled"],
      required: true,
    },
    type: {
      type: String,
      enum: ["hotel", "destination"],
      required: true,
    },
    isRead: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IBooking>("Booking", BookingSchema);
