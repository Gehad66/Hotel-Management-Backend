const Sequelize = require('sequelize');
const dbSequalize = require('./sequelize');


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
},
 {
    indexes: [{
        unique: false,
        fields: ['hotelier_name']
    }]
});
 
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
},
{
   indexes: [{
       unique: false,
       fields: ['reputationBadge']
   }]
});
 
const hotel_location = dbSequalize.define('hotel_location', {
    location_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    zip_code: {
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
},
{
  indexes: [{
       unique: false,
       fields: ['city', 'country']
   }]
});

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
    image_url: {
        type: Sequelize.STRING,
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
},
{
  indexes: [{
       unique: false,
       fields: ['item_name', 'rating']
   }]
});


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

hotel_location.hasMany(items, {
    foreignKey: "id"
  });
items.belongsTo(hotel_location, {as: 'location',
    foreignKey: "location_id"
  });
category.hasMany(items, {
    foreignKey: "id"
  })
items.belongsTo(category, {
foreignKey: "category_id"
});
reputationBadge.hasMany(items, {
    foreignKey: "id"
  })
items.belongsTo(reputationBadge, {
foreignKey: "reputationBadge_id"
});
hotelier.hasMany(items, {
    foreignKey: "id"
  })
items.belongsTo(hotelier, {
foreignKey: "hotelier_id"
});

module.exports = {
    hotelier,
    category,
    reputationBadge,
    hotel_location,
    items,
    image,
    Sequelize
};
