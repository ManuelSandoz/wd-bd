/*
// File name: COMP-3015-M3-LAB-1-Manuel-Sandoz.sql
// File date: 10/30/22
// Programmer: Manuel Sandoz Santiago
// Description: This file holds all the SQL commands used to create the database for the project. It also contains some queries as examples of how the data can be manipulated 
// Last update: 11/26/22
*/

-- Create the brew_review database
CREATE DATABASE brew_review;

-- Creating the users table
CREATE TABLE tbl_USERS (
	id INT PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(25) NOT NULL,
    lastName VARCHAR(25) NOT NULL 
);

-- Creating the reviews table
CREATE TABLE tbl_REVIEWS (
    review_id INT PRIMARY KEY AUTO_INCREMENT,
	email VARCHAR(40) NOT NULL,
    drink VARCHAR(15) NOT NULL,
    size VARCHAR(6) NOT NULL,
    review VARCHAR(255) NOT NULL,
    visitDate VARCHAR(20) NULL,
    picture VARCHAR(50) NULL,
    agreement BOOLEAN NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES tbl_USERS(id)
);

-- Alter methods
ALTER TABLE tbl_REVIEWS
ADD agrmnt boolean NOT NULL;

-- Alter method to delete agrmnt column
ALTER TABLE tbl_REVIEWS
DROP COLUMN agrmnt;

-- Inserting values into the users table 
INSERT INTO tbl_USERS (firstName, lastName)
VALUES
('Manuel', 'Sandoz'),
('Alexandra', 'Rosario'),
('Noah', 'Almeda'),
('Irma', 'Santiago'),
('Maura', 'Sandoz'),
('Leticia', 'Hernandez'),
('Israel', 'Rosario'),
('Shakill', 'Ruiz'),
('Jesus', 'Sandoz'),
('Pedro', 'Santiago'),
('Lebron', 'James');

-- Inserting values into the reviews table 
INSERT INTO tbl_REVIEWS (email, drink, size, review, visitDate, picture, agreement, user_id)
VALUES
('manuel@email.com', 'latte', '12 oz.', "The best latte I've ever had in my life!!", '2022-11-29T10:32', 'review-img-2.png', 1, 1),
('arosario@email.com', 'mocha', '12 oz.', "It was missing chocolate", '2022-11-29T10:32', 'review-img-3.png', 1, 2),
('noalmeda@email.com', 'mocha', '8 oz.', "This is my favourite drink", '2022-11-29T10:32', 'review-img-2.png', 1, 3),
('istago@gmail.com', 'cappuccino', '8 oz.', "The barista burnt the coffee", '2022-11-29T10:32', 'review-img-4.png', 1, 4),
('msandoz@email.com', 'espresso', '8 oz.', "This barista is the best ever. I will definitely be back", '2022-11-29T10:32', 'review-img-1.png', 1, 5),
('lhernandez@email.com', 'mocha', '16 oz.', "I love mocha's and this one did not dissapoint", '2022-11-29T10:32', 'review-img-3.png', 1, 6),
('irosario@email.com', 'latte', '16 oz.', "The coffe tasted like water! I will order a smaller size next time", '2022-11-29T10:32', 'review-img-2.png', 1, 7),
('sruiz@email.com', 'cappuccino', '8 oz.', "This was my first time trying this drink and I loved it.", '2022-11-29T10:32', 'review-img-1.png', 1, 8),
('js@email.com', 'latte', '12 oz.', "The barista was very friendly and skilled.", '2022-11-29T10:32', 'review-img-4.png', 1, 9),
('psantiago@email.com', 'latte', '16 oz.', "Good coffee", '2022-11-29T10:32', '', 1, 10),
('fulano@gmail.com', 'latte', '12 oz.', "Pretty good coffee. Will visit agian", '', 'review-img-2.png', 1, 11);

-- Updating the values for review table
UPDATE tbl_REVIEWS
SET email = 'manuelsandoz@email.com'
WHERE user_id = 1;

UPDATE tbl_REVIEWS
SET review = "This is my favorite drink"
WHERE review_id = 3;

UPDATE tbl_USERS
SET firstName = "Manuel"
WHERE id = 1;

UPDATE tbl_REVIEWS
SET size = "16 oz."
WHERE review_id = 2;

-- Deleting an entry from review table
DELETE tbl_REVIEWS FROM tbl_REVIEWS
WHERE review_id = 11; 

DELETE tbl_USERS FROM tbl_USERS
WHERE id = 11;

-- Select queries
SELECT * 
FROM tbl_REVIEWS
JOIN tbl_USERS ON tbl_REVIEWS.user_id = tbl_USERS.id
WHERE tbl_USERS.id = 1;

SELECT * 
FROM tbl_REVIEWS 
WHERE size = "12 oz.";

SELECT DISTINCT email
FROM tbl_REVIEWS;

SELECT email, firstName, lastName
FROM tbl_USERS
JOIN tbl_REVIEWS ON tbl_USERS.id = tbl_REVIEWS.user_id
WHERE drink = "mocha";

SELECT size
FROM tbl_REVIEWS
WHERE drink = "mocha";