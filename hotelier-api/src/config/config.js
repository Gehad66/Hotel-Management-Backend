const config = {
    'username': 'root',
    'password': 'secretG6',
    'database': 'hotels_db',
    'db_host': process.env.MYSQL_HOST | 'localhost',
    'dialect': 'mysql',
  };
module.exports = config;