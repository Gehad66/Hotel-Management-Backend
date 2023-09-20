var express = require('express');
var HotelController = require('../controllers/hotel.controller')

var router = express.Router();


router.get('/', HotelController.getHotels)

module.exports = router;