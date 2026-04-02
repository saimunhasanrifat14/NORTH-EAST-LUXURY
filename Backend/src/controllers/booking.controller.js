const mongoose = require("mongoose");
const Booking = require("../models/Booking.model");
const { APIResponse } = require("../utilities/APIResponse");
const { AsyncHandler } = require("../utilities/AsyncHandler");
const { CustomError } = require("../utilities/CustomError");

const BOOKING_STATUSES = ["pending", "confirmed", "completed", "cancelled"];

const buildBookingQuery = (queryParams = {}) => {
  const {
    search = "",
    status = "",
    serviceType = "",
    vehicleType = "",
  } = queryParams;

  const mongoQuery = {};

  if (search.trim()) {
    const searchRegex = new RegExp(search.trim(), "i");
    mongoQuery.$or = [
      { fullName: searchRegex },
      { email: searchRegex },
      { phoneNumber: searchRegex },
    ];
  }

  if (BOOKING_STATUSES.includes(status)) {
    mongoQuery.status = status;
  }

  if (serviceType.trim()) {
    mongoQuery.serviceType = serviceType.trim();
  }

  if (vehicleType.trim()) {
    mongoQuery.vehicleType = vehicleType.trim();
  }

  return mongoQuery;
};

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
  const mongoQuery = buildBookingQuery(req.query);

  const [bookings, totalBookings] = await Promise.all([
    Booking.find(mongoQuery).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Booking.countDocuments(mongoQuery),
  ]);

  APIResponse.success(res, 200, "Bookings retrieved successfully", {
    bookings,
    filters: {
      search: req.query.search?.trim() || "",
      status: req.query.status?.trim() || "",
      serviceType: req.query.serviceType?.trim() || "",
      vehicleType: req.query.vehicleType?.trim() || "",
    },
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

exports.getBookingOverview = AsyncHandler(async (_req, res) => {
  const [totalBookings, statusCounts] = await Promise.all([
    Booking.countDocuments(),
    Booking.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]),
  ]);

  const countsByStatus = BOOKING_STATUSES.reduce((accumulator, status) => {
    accumulator[status] = 0;
    return accumulator;
  }, {});

  statusCounts.forEach(({ _id, count }) => {
    if (countsByStatus[_id] !== undefined) {
      countsByStatus[_id] = count;
    }
  });

  const percentages = BOOKING_STATUSES.reduce((accumulator, status) => {
    accumulator[status] = totalBookings
      ? Math.round((countsByStatus[status] / totalBookings) * 100)
      : 0;
    return accumulator;
  }, {});

  APIResponse.success(res, 200, "Booking overview retrieved successfully", {
    totalBookings,
    counts: countsByStatus,
    percentages,
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

exports.updateBookingStatus = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomError(400, "Invalid booking id");
  }

  if (!status || !BOOKING_STATUSES.includes(status)) {
    throw new CustomError(
      400,
      `Valid status is required: ${BOOKING_STATUSES.join(", ")}`
    );
  }

  const booking = await Booking.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  );

  if (!booking) {
    throw new CustomError(404, "Booking not found");
  }

  APIResponse.success(res, 200, "Booking status updated successfully", booking);
});
