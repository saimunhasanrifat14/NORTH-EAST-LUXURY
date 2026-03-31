const express = require("express");
const router = express.Router();
const { CreateBooking, getAllBookings, getSingleBooking } = require("../../controllers/booking.controller");

router.post("/createbooking", CreateBooking);
router.get("/getallbookings", getAllBookings);
router.get("/getsinglebooking/:id", getSingleBooking);

module.exports = router;