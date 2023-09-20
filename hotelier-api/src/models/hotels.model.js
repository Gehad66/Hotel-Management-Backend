const Sequelize = require('sequelize');
const dbSequalize = require('./sequelize');

// export
 const hotelier = dbSequalize.define('hotelier', {
    hotelier_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    hotelier_name: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});
// export 
const category = dbSequalize.define('category', {
    category_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    category_type: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

// export
 const reputationBadge = dbSequalize.define('reputationBadge', {
    reputationBadge_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    reputationBadge: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});
// export 
const hotel_location = dbSequalize.define('hotel_location', {
    location_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    zipcode: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false
    },
    state_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    location_address: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
// export
 const items = dbSequalize.define('items', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    item_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    rating: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    reputation: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    availability_size: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    category_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
            model: 'category',
            key: 'category_id',
        }
    },
    location_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
            model: 'hotel_location',
            key: 'location_id',
        }
    },
    reputationBadge_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
            model: 'reputationBadge',
            key: 'reputationBadge_id',
        }
    },
    hotelier_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
            model: 'hotelier',
            key: 'hotelier_id',
        }
    }
});

// export
 const image = dbSequalize.define('image', {
    image: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    image_url: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    item_id: {
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
            model: 'items',
            key: 'id',
        }
    }
});
// dbSequalize.sync();

module.exports = {
    hotelier,
    category,
    reputationBadge,
    hotel_location,
    items,
    image
};
