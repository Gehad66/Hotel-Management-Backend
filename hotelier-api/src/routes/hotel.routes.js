var express = require('express');
var HotelController = require('../controllers/hotel.controller')

var router = express.Router();
const asyncHandler = fn => (req, res, next) => {
    return Promise
        .resolve(fn(req, res, next))
        .catch(next);
};

router.get('/', asyncHandler(HotelController.getAllHoteliers));
router.post('/', asyncHandler(HotelController.addHotelier));

router.get('/:hotelier_id', asyncHandler(HotelController.getHotelier));
router.get('/:hotelier_id/items', asyncHandler(HotelController.getHotelierItems));
router.get('/:hotelier_id/items/:item_id', asyncHandler(HotelController.getHotelierSingleItem));
router.post('/:hotelier_id/items', asyncHandler(HotelController.createHotelierItems));
router.put('/:hotelier_id/items/:item_id', asyncHandler(HotelController.updateHotelierItems));
router.delete('/:hotelier_id/items/:item_id', asyncHandler(HotelController.deleteHotelierItems));







module.exports = router;