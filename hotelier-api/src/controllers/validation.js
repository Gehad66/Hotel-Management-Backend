const validateRating = (rating) => {
    if (typeof rating !== 'number' || rating < 0 || rating > 5) {
        throw Error("Rating Error, supported range is 0 to 5");
    }
}
const validateItemName = (name) => {
    if (name.length < 10) {
        throw Error("Error: name must be longer than 10 characters");

    }
    name = name.toLowerCase();
    const restrictedJargon = ['free', 'offer', 'book', 'website'];
    for (const jargon of restrictedJargon) {
        if (name.includes(jargon)) {
            throw Error("Error in name, please remove any of free, offer, book, website");
        }
    }
}
const validateItemCategory = (category) => {
    const validCategories = ['hotel', 'alternative', 'hostel', 'lodge', 'resort', 'guest-house'];
    if (!validCategories.includes(category.toLowerCase())) {
        throw Error("Error: Unsupported category type");
    }
}
const validateZipCodeLength = (zipCode) => {
    const codeLength = Math.ceil(Math.log10(zipCode + 1));
    if (typeof zipCode !== 'number' || codeLength != 5) {
        throw Error("Zipcode Error, length must be 5 digits");
    }
}
const validateReputationRange = (reputation) => {
    if (typeof reputation !== 'number' || reputation < 0 || reputation > 1000) {
        throw Error("reputation Error, reputation range is 0 - 1000");
    }
}
const validateImageURL = (url) => {
    const urlRegex = /(https?:\/\/)([a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+)([^\s]+)/;
    const isValidUrl = urlRegex.test(url);
    if (!isValidUrl) {
        throw Error("Error: invalid image url");
    }
}

function isInteger(param) {
    try {
        return Number.isInteger(+param);
    } catch (e) {
        return false;
    }
}

function validateInteger(id) {
    if (!isInteger(id)) {
        return res.status(400).json({
            status: 400,
            message: 'Error: Invalid id type, expecting int'
        });
    }
}

const validateItemCreation = (item) => {
    validateItemName(item.name);
    validateRating(item.rating);
    validateReputationRange(item.reputation);
    validateItemCategory(item.category);
    validateZipCodeLength(item.location.zip_code);
    if (item.image)
        validateImageURL(item.image);
}
const validateItemUpdate = (item) => {
    if (item.name) validateItemName(item.name);
    if (item.rating) validateRating(item.rating);
    if (item.reputation) validateReputationRange(item.reputation);
    if (item.category) validateItemCategory(item.category);
    if (item.location && item.location.zip_code) validateZipCodeLength(item.location.zip_code);
    if (item.image) validateImageURL(item.image);
}

module.exports = {
    validateItemCreation,
    validateItemUpdate,
    validateInteger,
    validateZipCodeLength
};