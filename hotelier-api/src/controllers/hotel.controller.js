const hotelService = require("../services/hotel.service")
class HotelController {
    static async getAllHoteliers(req, res) {
        // throw new apiError('Something went wrong', 404); 
        return await hotelService.getAllHoteliers(req, res);
    }

    static async getHotelier(req, res) {
        return await hotelService.getHotelier(req, res);
    }
   
    static async addHotelier(req, res) {
        return await hotelService.addHotelier(req, res);
    }

    static async getHotelierSingleItem(req, res) {
        return await hotelService.getHotelierSingleItem(req, res);
    }

    static async getHotelierItems(req, res) {
        return await hotelService.getHotelierItems(req, res);
    }

    static async createHotelierItems(req, res) {
        return await hotelService.createHotelierItems(req, res);
    }

    static async updateHotelierItems(req, res) {
        return await hotelService.updateHotelierItems(req, res);
    }

    static async deleteHotelierItems(req, res) {
        return await hotelService.deleteHotelierItems(req, res);
    }
}

module.exports = HotelController;