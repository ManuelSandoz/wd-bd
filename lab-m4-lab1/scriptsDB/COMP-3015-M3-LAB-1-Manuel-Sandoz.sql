/*
// File name: COMP-3015-M3-LAB-1-Manuel-Sandoz.sql
// File date: 10/30/22
// Programmer: Manuel Sandoz Santiago
// Description: This file holds all the SQL commands used to create the database for the project. It also contains some queries as examples of how the data can be manipulated 
*/

-- Create the brew_review database
CREATE DATABASE brew_review;

-- Creating the users table
CREATE TABLE tbl_USERS (
	id int PRIMARY KEY,
    firstName varchar(25) NOT NULL,
    lastName varchar(25) NOT NULL
)

-- Creating the reviews table
CREATE TABLE tbl_REVIEWS (
	email varchar(40) NOT NULL PRIMARY KEY,
    drink varchar(15) NOT NULL,
    size int NOT NULL,
    review varchar(255) NOT NULL,
    user_id int,
    FOREIGN KEY(user_id) REFERENCES tbl_USERS(id)
);

-- Alter methods
ALTER TABLE tbl_REVIEWS
ADD agrmnt boolean NOT NULL;

-- Alter method to delete agrmnt column
ALTER TABLE tbl_REVIEWS
DROP COLUMN agrmnt;

-- Inserting values into the users table 
INSERT INTO tbl_USERS (id, firstName, lastName)
VALUES
(1, 'Manuel', 'Sandoz'),
(2, 'Alexandra', 'Rosario'),
(3, 'Noah', 'Almeda'),
(4, 'Irma', 'Santiago'),
(5, 'Maura', 'Sandoz');

-- Inserting values into the reviews table 
INSERT INTO tbl_REVIEWS (review_id, email, drink, size, review, user_id)
VALUES
(1, 'manuel@email.com', 'latte', '12 oz.', "The best latte I've ever had in my life!!", 1),
(2, 'arosario@email.com', 'mocha', '12 oz.', "It was missing chocolate",2),
(3, 'noalmeda@email.com', 'mocha', '8 oz.', "This is my favourite drink", 3),
(4, 'istago@gmail.com', 'cappuccino', '8 oz.', "The barista burnt the coffee", 4),
(5, 'msandoz@email.com', 'espresso', '8 oz.', "This barista is the best ever. I will definitely be back", 5),
(6, 'msandoz@email.com', 'mocha', '16 oz.', "I love mocha's and this one did not dissapoint", 5),
(7, 'manuel@email.com', 'latte', '16 oz', "The coffe tasted like water! I will order a smaller size next time", 1),
(8, 'manuel@email.com', 'cappuccino', '8 oz.', "This was my first time trying this drink and I loved it.", 1),
(9, 'istago@email.com', 'latte', '12 oz.', "The barista was very friendly and skilled.", 4),
(10, 'noalmeda@email.com', 'latte', '16 oz.', "Good coffee", 3),
(11, 'manuel27@gmail.com', 'latte', '12 oz.', "Pretty good coffee. Will visit agian", 1);

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
DELETE FROM tbl_REVIEWS
WHERE review_id = 11; 

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