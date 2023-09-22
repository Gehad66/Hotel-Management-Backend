// var hotelService = require('../services/hotel.service')
var hotel = require("../models/hotels.model");
var validator = require("./validation");
var helperFunctions = require("./helper");

class HotelController {
    static async getAllHoteliers(req, res) {
        try {
            // var hotels = await hotelService.getHotels({});
            var hotels = await hotel.hotelier.findAll();
            return res.status(200).json({
                hotels
            });
        } catch (e) {
            return res.status(500).json({
                status: 500,
                message: e.message
            });
        }
    }
    //   get hoterlier_name by name or id usign query parms
    static async getHotelier(req, res) {
        try {
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
        } catch (e) {
            return res.status(500).json({
                status: 500,
                message: e.message
            });
        }
    }
    static async addHotelier(req, res) {
        try {
            const hotelier_name = req.body;
            const new_hotelier = await hotel.hotelier.create(hotelier_name);
            return res.status(200).json({
                new_hotelier
            });
        } catch (e) {
            return res.status(500).json({
                status: 500,
                message: e.message
            });
        }

    }
    static async getHotelierItems(req, res) {
        try {
            const hoterlier_name = req.params.hotelier_id;
            var items;
            if (Number.isInteger(+hoterlier_name)) {
                items = await hotel.items.findAll({
                    where: {
                        hotelier_id: +hoterlier_name
                    },
                    include: [{
                        model: hotel.hotel_location,
                        as: 'location',
                        attributes: ['city', ['state_name', 'state'], 'country', 'zip_code', ['location_address', 'address']],
                        required: true
                    }]
                });
            } else {
                items = await hotel.items.findAll({
                    where: {
                        hotelier_name: hoterlier_name
                    }
                });
            }
            return res.status(200).json({
                items
            });
        } catch (e) {
            return res.status(500).json({
                status: 500,
                message: e.message
            });
        }
    }

    async getHotelierID(hotierName) {
        id = hotel.hotelier.findAll({
            where: {
                hotelier_name: hotierName
            },
            attributes: ['hotelier_id']
        });
        return id;
    }
    getItemID(itemName) {
        id = hotel.items.findAll({
            where: {
                item_name: itemName
            },
            attributes: ['id']
        });
    }

    static async getHotelierSingleItem(req, res) {
        try {
            const {
                hotelier_id,
                item_id
            } = req.params;

            validator.validateInteger(hotelier_id);
            validator.validateInteger(item_id);

            const items = await hotel.items.findAll({
                // raw: true,
                attributes: [
                    ['item_name', 'name'],
                    'rating',
                    ['image_url', 'image'],
                    'reputation',
                    'price',
                    ['availability_size', 'availability'],
                    'reputationBadge_id'
                ],
                where: {
                    hotelier_id: +hotelier_id,
                    id: +item_id
                },
                include: [{
                        model: hotel.hotel_location,
                        as: 'location',
                        attributes: ['city', ['state_name', 'state'], 'country', 'zip_code', ['location_address', 'address']],
                        required: true
                    },
                    {
                        model: hotel.category,
                        attributes: [
                            [hotel.Sequelize.col('category_type'), 'category']
                        ]
                    },
                    {
                        model: hotel.reputationBadge,
                        attributes: [
                            [hotel.Sequelize.col('reputationBadge'), 'reputationBadge']
                        ]
                    }
                ]
            });
            var formated_item = helperFunctions.formatItemsResponse({
                items
            });
            return res.status(200).json(
                formated_item
            );
        } catch (e) {
            return res.status(500).json({
                status: 500,
                message: e.message
            });
        }
    }

    static async createHotelierItems(req, res) {
        try {
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
            const new_item = await hotel.items.create({
                item_name: item.name,
                hotelier_id: req.params.hotelier_id,
                rating: item.rating,
                image_url: item.image,
                reputation: item.reputation,
                price: item.price,
                availability_size: item.availability,
                category_id: category_id,
                location_id: new_location.id,
                reputationBadge: helperFunctions.calculateReputationBadge(item.reputation)
            });
            return res.status(200).json({
                new_item
            });
        } catch (e) {
            return res.status(500).json({
                status: 500,
                message: e.message
            });
        }

    }

    static async updateHotelierItems(req, res) {
        try {
            const {
                hotelier_id,
                item_id
            } = req.params;
            validator.validateInteger(hotelier_id);
            validator.validateInteger(item_id);
            const body = req.body;
            const isItemExist = await hotel.items.findOne({
                where: {
                    id: item_id,
                    hotelier_id: hotelier_id
                }
            });
            if (!isItemExist) {
                return res.status(404).json({
                    message: 'Error: No such item'
                });
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
            if(updateReq.category_id){
                const category = updateReq.category_id;
                const categoryQuery = await hotel.category.findOne({
                    where: {
                        category_type: category
                    }
                });
                updateReq.category_id = categoryQuery.category_id;
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
        } catch (e) {
            return res.status(500).json({
                status: 500,
                message: e.message
            });
        }

    }
    static async deleteHotelierItems(req, res) {
        try {
            const {
                hotelier_id,
                item_id
            } = req.params;
            validator.validateInteger(hotelier_id);
            validator.validateInteger(item_id);
            const isItemExist = await hotel.items.findOne({
                where: {
                    id: item_id,
                    hotelier_id: hotelier_id
                }
            });
            if (isItemExist) {
                await isItemExist.destroy({
                    force: true
                });
                return res.status(200).json({
                    isItemExist
                });
            } else {
                return res.status(404).json({
                    message: 'Error: No such item'
                });
            }
        } catch (e) {
            return res.status(500).json({
                status: 500,
                message: e.message
            });
        }

    }
}


module.exports = HotelController;