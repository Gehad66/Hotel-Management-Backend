var bookingModel = require("../models/bookings.model");
var validator = require("./validate");
const Sequelize = require('sequelize');
const apiError = require("../Errors/apiError");

exports.availabilityItemUpdate = async function (req, res) {
    const body = req.body;
    const availability = await bookingModel.items_availability.findOne({
        attributes: ['max_availability', 'id'],
        where: {
            item_id: body.item_id,
            hotelier_id: body.hotelier_id
        }
    });
    if (!availability) {
        throw new apiError('Error: No such item', 404);
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
}

exports.availabilityItem = async function (req, res) {
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
}


exports.bookItem = async function (req, res) {
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
        throw new apiError('No booking availability', 403);
    }
    return res.status(200).json({
        message: 'Success: booked'
    });

}