const bookingService = require("../services/bookings.service")

class BookingController {
    static async availabilityItemUpdate(req, res) {
        return await bookingService.availabilityItemUpdate(req, res);
    }

    static async availabilityItem(req, res) {
        return await bookingService.availabilityItem(req, res);
    }

    static async bookItem(req, res) {
        return await bookingService.bookItem(req, res);
    }
}
module.exports = BookingController;