const Sequelize = require('sequelize');
const dbSequalize = require('./sequelize');

const bookings = dbSequalize.define('bookings', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }, 
    item_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    start_date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    end_date: {
        type: Sequelize.DATE,
        allowNull: false,
    }
},
 {
    indexes: [{
        unique: false,
        fields: ['item_id', 'start_date', 'end_date']
    }]
});

module.exports = {bookings};