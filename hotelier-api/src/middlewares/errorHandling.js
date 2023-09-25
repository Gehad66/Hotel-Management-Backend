var apiError = require("../Errors/apiError");

module.exports = function (err, req, res, next) {
    if(err instanceof apiError){
        return res.status(err.status).json({
            status: err.status,
            message: err.message
        });
    }
    return res.status(500).json({
        status: 500,
        message: err.message
    });
};

