var express = require('express');
var BookingController = require('../controllers/bookings.controller')

var router = express.Router();
const asyncHandler = fn => (req, res, next) => {
    return Promise
        .resolve(fn(req, res, next))
        .catch(next);
};
router.post('/hoteliers/:hotelier_id/items/:item_id', asyncHandler(BookingController.bookItem));
router.post('/availability', asyncHandler(BookingController.availabilityItem));
router.put('/availability', asyncHandler(BookingController.availabilityItemUpdate));


module.exports = router;