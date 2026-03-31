const express = require('express');
const router = express.Router();

router.use('/booking', require('./api/booking.api'));

module.exports = router;