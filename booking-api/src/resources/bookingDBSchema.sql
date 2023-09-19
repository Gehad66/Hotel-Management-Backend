create database IF NOT EXISTS bookings_db;

USE bookings_db;
CREATE TABLE reservations (
  id INT NOT NULL AUTO_INCREMENT,
  item_id INT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  PRIMARY KEY (id)
);

Insert into reservations (item_id, start_date, end_date) values (1,'2023-09-12','2023-09-16');
