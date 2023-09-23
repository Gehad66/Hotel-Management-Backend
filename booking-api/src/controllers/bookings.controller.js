var bookingModel = require("../models/bookings.model");
const Sequelize = require('sequelize');
var unirest = require('unirest');
const validator = require("./validate");

// TODO
const HOTELAPIURL = 'http://127.0.0.1:4000';
const HOTELIER = '/hoteliers/';
const ITEMS = '/items/';
async function getAvailability(hotelier_id, item_id) {
    const url = HOTELAPIURL + HOTELIER + hotelier_id + ITEMS + item_id;
    const response = await unirest.get(url);
    if (response.error) {
        throw response.error;
    }

    return response.body.availability;
}

class BookingController {
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
                        }]
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