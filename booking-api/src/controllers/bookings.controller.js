var bookingModel = require("../models/bookings.model");

class BookingController {
    static async getBookings(req, res) {
        try {
            var allBookings = await bookingModel.bookings.findAll();
            return res.status(200).json({allBookings});
        } catch (e) {
            return res.status(400).json({ status: 400, message: e.message });
        }
      }
    
}
module.exports = BookingController;
