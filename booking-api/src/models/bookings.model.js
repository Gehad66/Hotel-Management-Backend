const Sequelize = require('sequelize');
const dbSequalize = require('./sequelize');

const items_availability = dbSequalize.define('items_availability', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    max_availability: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    hotelier_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
}, {
    indexes: [{
        unique: false,
        fields: ['item_id', 'hotelier_id', 'id']
    }]
});

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
    hotelier_id: {
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
    },
    item_availability_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
            model: 'items_availability',
            key: 'id',
        }
    }
}, {
    indexes: [{
        unique: false,
        fields: ['item_id', 'start_date', 'end_date']
    }]
});


items_availability.hasMany(bookings, {
    foreignKey: "id"
});
bookings.belongsTo(items_availability, {
    foreignKey: "id"
});
module.exports = {
    bookings,
    items_availability
};