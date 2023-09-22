create database IF NOT EXISTS hotels_db;

USE hotels_db;

CREATE TABLE hotelier (
  hotelier_id INT NOT NULL AUTO_INCREMENT,
  hotelier_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (hotelier_id)
);
CREATE INDEX hotelier_index ON hotelier(hotelier_name);
CREATE TABLE category (
  category_id INT NOT NULL AUTO_INCREMENT,
  category_type VARCHAR(255) NOT NULL,
  PRIMARY KEY (category_id)
);
CREATE TABLE reputationBadge (
  reputationBadge_id INT NOT NULL AUTO_INCREMENT,
  reputationBadge VARCHAR(255) NOT NULL,
  PRIMARY KEY (reputationBadge_id)
);
CREATE INDEX reputationBadge_index ON reputationBadge(reputationBadge);

CREATE TABLE hotel_location (
  location_id INT NOT NULL AUTO_INCREMENT,
  zip_code INT NOT NULL,
  country VARCHAR(255) NOT NULL,
  state_name VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  location_address VARCHAR(255) NOT NULL,
  PRIMARY KEY (location_id)
);
CREATE INDEX location_index ON hotel_location(country,city);
CREATE TABLE items (
  id INT NOT NULL AUTO_INCREMENT,
  item_name VARCHAR(255) NOT NULL,
  rating INT CHECK (rating BETWEEN 0 AND 5),
  reputation int CHECK (reputation BETWEEN 0 AND 1000),
  price INT NOT NULL,
  availability_size int NOT NULL,
  category_id int,
  location_id int,
  reputationBadge_id int,
  hotelier_id int,
  image_url VARCHAR(255),
  PRIMARY KEY (id),
  FOREIGN KEY (category_id) REFERENCES category(category_id),
  FOREIGN KEY (location_id) REFERENCES hotel_location(location_id),
  FOREIGN KEY (reputationBadge_id) REFERENCES reputationBadge(reputationBadge_id),
  FOREIGN KEY (hotelier_id) REFERENCES hotelier(hotelier_id)
);
CREATE INDEX item_index ON items(item_name, rating);
CREATE TABLE image (
  image_id INT NOT NULL AUTO_INCREMENT,
  image_url VARCHAR(255) NOT NULL,
  item_id int,
  PRIMARY KEY (image_id),
  FOREIGN KEY (item_id) REFERENCES items(id)
);

-- Insert dummy test data
Insert into category(category_type) values('hotel');
Insert into category(category_type) values('alternative');
Insert into category(category_type) values('hostel');
Insert into category(category_type) values('lodge');
Insert into category(category_type) values('resort');
Insert into category(category_type) values('guest-house');
Insert into reputationBadge(reputationBadge) values('red');
Insert into reputationBadge(reputationBadge) values('yellow');
Insert into reputationBadge(reputationBadge) values('green');
insert into hotelier (hotelier_name) Values ('helnan');
insert into hotel_location (zip_code,country,state_name,city,location_address) Values (12345,'Egypt','Cairo','Cairo','address xx');
insert into items (
item_name,
rating,
reputation,
price,
availability_size,
category_id,
location_id,
reputationBadge_id,
hotelier_id
)Values ('Helnan Alexandria', 4, 900, 700, 10, 1,1,3,1);