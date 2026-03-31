const mongoose = require("mongoose");
const Booking = require("../models/Booking.model");
const { APIResponse } = require("../utilities/APIResponse");
const { AsyncHandler } = require("../utilities/AsyncHandler");
const { CustomError } = require("../utilities/CustomError");

exports.CreateBooking = AsyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    phoneNumber,
    serviceType,
    vehicleType,
    pickupLocation,
    dropoffLocation,
    date,
    time,
    passengers,
    specialRequests,
  } = req.body;

  // Basic validation
  if (
    !fullName ||
    !email ||
    !phoneNumber ||
    !serviceType ||
    !vehicleType ||
    !pickupLocation ||
    !dropoffLocation ||
    !date ||
    !time
  ) {
    throw new CustomError(400, "All required fields must be provided");
  }

  const booking = await Booking.create({
    fullName,
    email,
    phoneNumber,
    serviceType,
    vehicleType,
    pickupLocation,
    dropoffLocation,
    date,
    time,
    passengers,
    specialRequests,
  });

  APIResponse.success(res, 200, "Booking created successfully", booking);
});

exports.getAllBookings = AsyncHandler(async (req, res) => {
  const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
  const limit = Math.min(
    100,
    Math.max(1, Number.parseInt(req.query.limit, 10) || 10)
  );
  const skip = (page - 1) * limit;

  const [bookings, totalBookings] = await Promise.all([
    Booking.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
    Booking.countDocuments(),
  ]);

  APIResponse.success(res, 200, "Bookings retrieved successfully", {
    bookings,
    pagination: {
      page,
      limit,
      totalBookings,
      totalPages: Math.ceil(totalBookings / limit) || 1,
      hasNextPage: page * limit < totalBookings,
      hasPrevPage: page > 1,
    },
  });
});

exports.getSingleBooking = AsyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new CustomError(400, "Invalid booking id");
  }

  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    throw new CustomError(404, "Booking not found");
  }

  APIResponse.success(res, 200, "Booking retrieved successfully", booking);
});
