var express = require('express');
var BookingController = require('../controllers/bookings.controller')

var router = express.Router();


router.get('/', BookingController.getBookings)

module.exports = router;