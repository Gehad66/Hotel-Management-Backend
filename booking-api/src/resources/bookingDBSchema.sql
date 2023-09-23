create database IF NOT EXISTS bookings_db;

USE bookings_db;
CREATE TABLE items_availability (
  id INT NOT NULL AUTO_INCREMENT,
  max_availability INT NOT NULL,
  hotelier_id INT NOT NULL,
  item_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE bookings (
  id INT NOT NULL AUTO_INCREMENT,
  item_id INT NOT NULL,
  hotelier_id INT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  item_availability_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (item_availability_id) REFERENCES items_availability(id)
);

CREATE INDEX bookings_index ON bookings(item_id, start_date, end_date, hotelier_id);
CREATE INDEX availability_index ON items_availability(item_id, hotelier_id, id);

-- Insert dummy test data
Insert into items_availability (max_availability, hotelier_id, item_id) 
values (10, 1, 1 );
Insert into bookings (item_id, hotelier_id, start_date, end_date, item_availability_id) 
values (1, 1, '2023-09-12', '2023-09-16', 1);
