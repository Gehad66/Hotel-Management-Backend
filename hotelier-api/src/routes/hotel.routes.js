var express = require('express');
var HotelController = require('../controllers/hotel.controller')

var router = express.Router();


router.get('/', HotelController.getAllHoteliers);
router.post('/', HotelController.addHotelier);

router.get('/:hotelier_id', HotelController.getHotelier);
router.get('/:hotelier_id/items', HotelController.getHotelierItems);
router.get('/:hotelier_id/items/:item_id', HotelController.getHotelierSingleItem);
router.post('/:hotelier_id/items', HotelController.createHotelierItems);
router.put('/:hotelier_id/items/:item_id', HotelController.updateHotelierItems);
router.delete('/:hotelier_id/items/:item_id', HotelController.deleteHotelierItems);







module.exports = router;