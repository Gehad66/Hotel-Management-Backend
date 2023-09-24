const config = {
    'username': 'root',
    'password': 'secretG6',
    'database': 'hotels_db',
    'db_host': process.env.MYSQL_HOST || 'localhost',
    'dialect': 'mysql',
    'booking_url': process.env.BOOK_URL || 'localhost'
  };
module.exports = config;