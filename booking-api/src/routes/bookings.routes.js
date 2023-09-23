var express = require('express');
var BookingController = require('../controllers/bookings.controller')

var router = express.Router();

router.post('/hoteliers/:hotelier_id/items/:item_id', BookingController.bookItem);

module.exports = router;