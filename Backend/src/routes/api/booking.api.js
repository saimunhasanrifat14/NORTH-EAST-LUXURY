const express = require("express");
const router = express.Router();
const { CreateBooking, getAllBookings, getSingleBooking } = require("../../controllers/booking.controller");
const { verifyAdminJWT } = require("../../middlewares/auth.middleware");

router.post("/createbooking", CreateBooking);
router.get("/getallbookings", verifyAdminJWT, getAllBookings);
router.get("/getsinglebooking/:id", verifyAdminJWT, getSingleBooking);

module.exports = router;
