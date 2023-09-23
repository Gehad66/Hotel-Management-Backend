var bookingModel = require("../models/bookings.model");
const Sequelize = require('sequelize');
const validator = require("./validate");
class BookingController {
    static async availabilityItemUpdate(req, res) {
        try {
            // TODO validation
            const body = req.body;
            const availability = await bookingModel.items_availability.findOne({
                attributes: ['max_availability', 'id'],
                where: {
                    item_id: body.item_id,
                    hotelier_id: body.hotelier_id
                }
            });
            if (!availability) {
                return res.status(404).json({
                    message: 'Error: No such item'
                });
            }
            const new_item = await bookingModel.items_availability.update({
                max_availability: body.max_availability
            }, {
                where: {
                    id: availability.id
                }
            });
            return res.status(200).json({
                message: 'Success: availabilty updated'
            });
        } catch (e) {
            return res.status(500).json({
                status: 500,
                message: e.message
            });
        }
    }
    static async availabilityItem(req, res) {
        try {
            // TODO validation
            const body = req.body;
            const new_item = await bookingModel.items_availability.create({
                item_id: body.item_id,
                hotelier_id: body.hotelier_id,
                max_availability: body.max_availability,
            });
            return res.status(200).json({
                message: 'Success: availabilty created'
            });
        } catch (e) {
            return res.status(500).json({
                status: 500,
                message: e.message
            });
        }
    }
    static async bookItem(req, res) {
        try {
            const {
                hotelier_id,
                item_id
            } = req.params;
            const {
                start_date,
                end_date
            } = req.body;
            validator.validateRequestBody(hotelier_id, item_id, start_date, end_date);
            const bookingsCount = await bookingModel.bookings.count({
                where: {
                    item_id: item_id,
                    [Sequelize.Op.or]: [{
                            start_date: {
                                [Sequelize.Op.between]: [start_date, end_date]
                            }
                        },
                        {
                            end_date: {
                                [Sequelize.Op.between]: [start_date, end_date]
                            }
                        }
                    ]
                }
            });
            const availability = await bookingModel.items_availability.findOne({
                attributes: ['max_availability', 'id'],
                where: {
                    item_id: item_id,
                    hotelier_id: hotelier_id
                }
            });
            // can book
            if (bookingsCount < availability.max_availability) {
                const new_booking = await bookingModel.bookings.create({
                    item_id: item_id,
                    hotelier_id: hotelier_id,
                    start_date: start_date,
                    end_date: end_date,
                    item_availability_id: availability.id
                });
            } else {
                return res.status(403).json({
                    status: 403,
                    message: 'No booking availability'
                });
            }
            return res.status(200).json({
                message: 'Success: booked'
            });
        } catch (e) {
            return res.status(500).json({
                status: 500,
                message: e.message
            });
        }
    }
}
module.exports = BookingController;