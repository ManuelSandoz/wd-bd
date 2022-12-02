<?php

  /*
  // File name: review-page.update.php
  // File date: 11/28/22
  // Programmer: Manuel Sandoz Santiago
  // Description: MISSING
  // Last update: --/--/--
  */

  // Unpack the POST variable into separate values
  $firstName = $_POST['firstName'];
  $lastName = $_POST['lastName'];
  $email = $_POST['email'];
  $drink = $_POST['drink'];
  $drinkSize = $_POST['drinkSize'];
  $review = $_POST['review'];
  $visitDate = $_POST['visitDate'];
  $picture = $_POST['picture'];
  $agreement = $_POST['agreement'];

  // Establishing connection to the DB
  $dataBase = new mysqli('localhost', 'root', '', 'brew_review');

  if ($dataBase -> connect_error) {
    die('ERROR: Database connection failed. ' . $dataBase -> connect_error);
  }
  else { 
    // $query = 'UPDATE TBL 
    //   WRITE TEH THING HERE';

      $query = "UPDATE 
            `tbl_REVIEWS`
        SET 
            firstName = $firstName,
            lastName = $lastName,
            email = $email,
            drink = $drink,
            size = $drinkSize,
            review = $review,
            visitDate = $visitDate,
            picture = $picture,
            agreement = $agreement
        FROM 
            `tbl_REVIEWS`
            JOIN tbl_USERS ON tbl_USERS.id = tbl_REVIEWS.user_id
        WHERE 
            firstName = $firstName 
        AND 
            lastName = $lastName";

// UPDATE
// user AS u
// INNER JOIN
// country AS c ON c.code = u.country_code
// INNER JOIN
// login AS l ON l.email = l.email
// SET
// u.name = 'John',
// u.country_name = c.name,
// l.country_name = c.name
// WHERE
// u.id = 3
    
    if ($dataBase -> query($query)) {
      echo(true);
    }
    else {
      echo(false);
    }
    
    $dataBase -> close();
  }
?>