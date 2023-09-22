create database IF NOT EXISTS bookings_db;

USE bookings_db;
CREATE TABLE bookings (
  id INT NOT NULL AUTO_INCREMENT,
  item_id INT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  PRIMARY KEY (id)
);

CREATE INDEX bookings_index ON bookings(item_id, start_date, end_date);

-- Insert dummy test data
Insert into bookings (item_id, start_date, end_date) values (1,'2023-09-12','2023-09-16');
