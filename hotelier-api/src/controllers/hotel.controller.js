// var hotelService = require('../services/hotel.service')
var hotel = require("../models/hotels.model");

class HotelController {
    static async getHotels(req, res) {
        try {
            // var hotels = await hotelService.getHotels({});
            var hotels = await hotel.hotelier.findAll();
            return res.status(200).json({hotels });
        } catch (e) {
            return res.status(400).json({ status: 400, message: e.message });
        }
      }
    
}
module.exports = HotelController;
