var hotel = require("../models/hotels.model");
var validator = require("./validation");
var helperFunctions = require("./helper");
const apiError = require("../Errors/apiError");

exports.getAllHoteliers = async function (req, res) {
    var hotels = await hotel.hotelier.findAll();
    return res.status(200).json({
        hotels
    });
}
exports.getHotelier = async function (req, res) {
    const hoterlier_name = req.params.hotelier_id;
    var hotelier;
    if (Number.isInteger(+hoterlier_name)) {
        hotelier = await hotel.hotelier.findAll({
            where: {
                hotelier_id: +hoterlier_name
            }
        });
    } else {
        hotelier = await hotel.hotelier.findAll({
            where: {
                hotelier_name: hoterlier_name
            }
        });
    }
    return res.status(200).json({
        hotelier
    });
}
exports.addHotelier = async function (req, res) {
    const hotelier_name = req.body;
    const new_hotelier = await hotel.hotelier.create(hotelier_name);
    return res.status(200).json({
        new_hotelier
    });
}
exports.getHotelierSingleItem = async function (req, res) {
    const {
        hotelier_id,
        item_id
    } = req.params;

    validator.validateInteger(hotelier_id);
    validator.validateInteger(item_id);
    const items = await helperFunctions.getHotelierSingleItemQuery(hotelier_id, item_id);
    var formated_item = helperFunctions.formatItemsResponse({
        items
    });
    if (formated_item.items.length == 1)
        return res.status(200).json(
            formated_item.items[0]
        );
    return res.status(200).json(
        formated_item
    );
}
exports.getHotelierItems = async function (req, res) {
    const hotelier_id = req.params.hotelier_id;
    validator.validateInteger(hotelier_id);
    const items = await helperFunctions.getHotelierAllItemsQuery(hotelier_id);
    var formated_item = helperFunctions.formatItemsResponse({
        items
    });
    return res.status(200).json(
        formated_item
    );
}

exports.createHotelierItems = async function (req, res) {
    const item = req.body;
    validator.validateItemCreation(item);
    var category_id = await hotel.category.findOne({
        where: {
            category_type: item.category
        }
    });
    category_id = category_id.category_id;
    const new_location = await hotel.hotel_location.create({
        city: item.location.city,
        state_name: item.location.state,
        country: item.location.country,
        zip_code: item.location.zip_code,
        location_address: item.location.address
    });
    const reputationBadge = helperFunctions.calculateReputationBadge(item.reputation);
    let reputationBadge_id = await hotel.reputationBadge.findOne({
        where: {
            reputationBadge: reputationBadge
        }
    });
    reputationBadge_id = reputationBadge_id.reputationBadge_id;
    const new_item = await hotel.items.create({
        item_name: item.name,
        hotelier_id: req.params.hotelier_id,
        rating: item.rating,
        image_url: item.image,
        reputation: item.reputation,
        price: item.price,
        availability_size: item.availability,
        category_id: category_id,
        location_id: new_location.location_id,
        reputationBadge_id: reputationBadge_id
    });
    const bookingAvailability = await helperFunctions.createBookingAvailability(
        new_item.id, req.params.hotelier_id, item.availability);
    return res.status(200).json({
        new_item
    });
}
exports.updateHotelierItems = async function (req, res) {
    const {
        hotelier_id,
        item_id
    } = req.params;
    validator.validateInteger(hotelier_id);
    validator.validateInteger(item_id);
    const body = req.body;
    const isItemExist = await helperFunctions.itemExists(hotelier_id, item_id);
    if (!isItemExist) {
        throw new apiError('Error: No such item', 404);
    }
    var updateReq = helperFunctions.createUpdateRequestBody(body);
    if (body.reputation) {
        const badge = updateReq.reputationBadge_id;
        const reputationQuery = await hotel.reputationBadge.findOne({
            where: {
                reputationBadge: badge
            }
        });
        updateReq.reputationBadge_id = reputationQuery.reputationBadge_id;
    }
    if (updateReq.category_id) {
        const category = updateReq.category_id;
        const categoryQuery = await hotel.category.findOne({
            where: {
                category_type: category
            }
        });
        updateReq.category_id = categoryQuery.category_id;
    }
    if (updateReq.availability_size) {
        const bookingAvailability = await helperFunctions.updateBookingAvailability(
            item_id, hotelier_id, updateReq.availability_size);
    }
    const updateItem = await hotel.items.update(
        updateReq, {
            where: {
                id: item_id,
                hotelier_id: hotelier_id
            }
        }
    );
    if (body.location) {
        var location = helperFunctions.updateLocationRequestBody(body.location);
        const updateLocation = await hotel.hotel_location.update(
            location, {
                where: {
                    location_id: isItemExist.location_id
                }
            }
        );
    }
    return res.status(200).json({
        status: 200,
        message: 'Update Success'
    });
}
exports.deleteHotelierItems = async function (req, res) {
    const {
        hotelier_id,
        item_id
    } = req.params;
    validator.validateInteger(hotelier_id);
    validator.validateInteger(item_id);
    const isItemExist = await helperFunctions.itemExists(hotelier_id, item_id);
    if (isItemExist) {
        await isItemExist.destroy({
            force: true
        });
        return res.status(200).json({
            status: 200,
            message: 'Delete Success'
        });
    } else {
        throw new apiError('Error: No such item', 404);
    }
}