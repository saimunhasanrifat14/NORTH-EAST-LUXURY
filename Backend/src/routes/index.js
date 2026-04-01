const express = require('express');
const router = express.Router();

router.use('/auth', require('./api/auth.api'));
router.use('/booking', require('./api/booking.api'));

module.exports = router;
