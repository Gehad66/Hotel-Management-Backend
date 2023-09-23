var validator = require("./validation");
var hotel = require("../models/hotels.model");
var unirest = require('unirest');

const BOOKING_SERVICE_URL = 'http://127.0.0.1:3000';
const BOOKINGS = '/bookings/availability';
async function createBookingAvailability(item_id, hotelier_id, availability) {
    var obj = {};
    obj['hotelier_id'] = hotelier_id;
    obj['item_id'] = item_id;
    obj['max_availability'] = availability;
    const url = BOOKING_SERVICE_URL + BOOKINGS;
    const response = await unirest.post(url).headers({
        'Content-Type': 'application/json'
      })
      .send(obj);
    if (response.error) {
        throw response.error;
    }
    return response.body.availability;
}
async function updateBookingAvailability(item_id, hotelier_id, availability) {
    var obj = {};
    obj['hotelier_id'] = hotelier_id;
    obj['item_id'] = item_id;
    obj['max_availability'] = availability;
    const url = BOOKING_SERVICE_URL + BOOKINGS;
    const response = await unirest.put(url).headers({
        'Content-Type': 'application/json'
      })
      .send(obj);
    if (response.error) {
        throw response.error;
    }
    return response.body.availability;
}
const calculateReputationBadge = (reputation) => {
    if (reputation <= 500) {
        return 'red';
    } else if (500 < reputation && reputation <= 799) {
        return 'yellow';
    } else {
        return 'green';
    }
}
const formatItemsResponse = (input) => {
    return {
        items: input.items.map(item => {
            return {
                name: item.dataValues.name,
                rating: item.rating,
                category: item.dataValues.category.dataValues.category,
                location: item.location,
                image: item.dataValues.image,
                reputation: item.reputation,
                reputationBadge: item.dataValues.reputationBadge.dataValues.reputationBadge,
                price: item.price,
                availability: item.dataValues.availability
            };
        })
    };
}
const createUpdateRequestBody = (body) => {
    validator.validateItemUpdate(body);
    var jsonData = {};
    if (body.name) {
        jsonData['item_name'] = body.name;
    }
    if (body.rating) {
        jsonData['rating'] = body.rating;
    }
    if (body.price) {
        jsonData['price'] = body.price;

    }
    if (body.availability) {
        jsonData['availability_size'] = body.availability;

    }
    if (body.image) {
        jsonData['image_url'] = body.image;
    }
    if (body.reputation) {
        jsonData['reputation'] = body.reputation;
        jsonData['reputationBadge_id'] = calculateReputationBadge(body.reputation);
    }
    if (body.category) {
        jsonData['category_id'] = body.category;
    }
    return jsonData;
}
const updateLocationRequestBody = (body) => {
    var jsonData = {};
    if (body.zip_code) {
        validator.validateZipCodeLength(body.zip_code);
        jsonData['zip_code'] = body.zip_code;
    }
    if (body.country) {
        jsonData['country'] = body.country;
    }
    if (body.state) {
        jsonData['state_name'] = body.state;
    }
    if (body.address) {
        jsonData['location_address'] = body.address;
    }
    if (body.city) {
        jsonData['city'] = body.city;
    }
    return jsonData;
}
async function itemExists(hotelier_id, item_id) {
    return await hotel.items.findOne({
        where: {
            id: item_id,
            hotelier_id: hotelier_id
        }
    });;
}
async function getHotelierAllItemsQuery(hotelier_id){
    return await hotel.items.findAll({
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
            hotelier_id: +hotelier_id
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
}
async function getHotelierSingleItemQuery(hotelier_id, item_id){
    return await hotel.items.findAll({
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
            
}

module.exports = {
    calculateReputationBadge,
    formatItemsResponse,
    createUpdateRequestBody,
    updateLocationRequestBody,
    getHotelierSingleItemQuery,
    itemExists,
    getHotelierAllItemsQuery,
    createBookingAvailability,
    updateBookingAvailability
};