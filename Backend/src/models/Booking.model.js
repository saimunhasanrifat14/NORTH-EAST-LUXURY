const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    serviceType: {
      type: String,
      enum: ["Airport", "Hourly", "Event", "VIP"],
      required: true,
    },

    vehicleType: {
      type: String,
      enum: ["Sedan", "SUV", "Luxury", "Minivan"],
      required: true,
    },

    pickupLocation: {
      type: String,
      required: true,
    },

    dropoffLocation: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    passengers: {
      type: Number,
      default: 1,
      min: 1,
    },

    specialRequests: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Booking", bookingSchema);