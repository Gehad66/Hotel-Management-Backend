var express = require('express');
var HotelController = require('../controllers/hotel.controller')

var router = express.Router();


router.get('/', HotelController.getAllHoteliers);
router.post('/', HotelController.addHotelier);

router.get('/:hoterlier_id', HotelController.getHotelier);
router.get('/:hoterlier_id/items', HotelController.getHotelierItems);
router.get('/:hoterlier_id/items/:item_id', HotelController.getHotelierSingleItem);
router.post('/:hoterlier_id/items', HotelController.createHotelierItems);
// router.put('/:hoterlier_id/items/:item_id', HotelController.updateHotelierItems);
router.delete('/:hoterlier_id/items/:item_id', HotelController.deleteHotelierItems);







module.exports = router;