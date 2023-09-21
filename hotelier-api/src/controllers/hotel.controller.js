// var hotelService = require('../services/hotel.service')
var hotel = require("../models/hotels.model");

class HotelController {
    static async getAllHoteliers(req, res) {
        try {
            // var hotels = await hotelService.getHotels({});
            var hotels = await hotel.hotelier.findAll();
            return res.status(200).json({
                hotels
            });
        } catch (e) {
            return res.status(400).json({
                status: 400,
                message: e.message
            });
        }
    }
    //   get hoterlier_name by name or id usign query parms
    static async getHotelier(req, res) {
        try {
            var hoterlier_name = req.params.hoterlier_id;
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
            return res.status(400).json({
                status: 400,
                message: e.message
            });
        }
    }
    static async getHotelierItems(req, res) {
        try {
            var hoterlier_name = req.params.hoterlier_id;
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
            return res.status(400).json({
                status: 400,
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
            var hoterlier_id = req.params.hoterlier_id;
            var item_id = req.params.item_id;
            if (!Number.isInteger(+hoterlier_id) || !Number.isInteger(+item_id)) {
                return res.status(400).json({
                    status: 400,
                    message: 'invalid id type, expecting int'
                });

            }
            var items = await hotel.items.findAll({
                // raw: true,
                attributes: [['item_name', 'name'], 'rating', ['image_url', 'image'], 'reputation', 'price', 
                ['availability_size', 'availability'],
                // [hotel.Sequelize.col('category.category_type') , 'category'], 
                'reputationBadge.reputationBadge'],
                where: {
                    hotelier_id: +hoterlier_id,
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
                        attributes: [[hotel.Sequelize.col('category_type') , 'category']]                       
                    },
                    {
                        model: hotel.reputationBadge,
                        attributes: []
                    },
                ]
            });
            return res.status(200).json({
                items
            });
        } catch (e) {
            return res.status(400).json({
                status: 400,
                message: e.message
            });
        }
    }

}

module.exports = HotelController;