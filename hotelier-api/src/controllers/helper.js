var validator = require("./validation");

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
    validator.validateZipCodeLength(body.zip_code);
    var jsonData = {};
    if (body.zip_code) {
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

module.exports = {
    calculateReputationBadge,
    formatItemsResponse,
    createUpdateRequestBody,
    updateLocationRequestBody
};