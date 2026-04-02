const express = require("express");
const router = express.Router();
const {
  CreateBooking,
  getAllBookings,
  getBookingOverview,
  getSingleBooking,
} = require("../../controllers/booking.controller");
const { verifyAdminJWT } = require("../../middlewares/auth.middleware");

router.post("/createbooking", CreateBooking);
router.get("/overview", verifyAdminJWT, getBookingOverview);
router.get("/getallbookings", verifyAdminJWT, getAllBookings);
router.get("/getsinglebooking/:id", verifyAdminJWT, getSingleBooking);

module.exports = router;
