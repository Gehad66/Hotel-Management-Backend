const config = {
  'username': 'root',
  'password': 'secretG6',
  'database': 'bookings_db',
  'db_host': process.env.MYSQL_HOST_BOOK || 'localhost',
  'port': process.env.BOOK_PORT|| '3306',
  'dialect': 'mysql',
};
module.exports = config;