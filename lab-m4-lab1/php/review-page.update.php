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
    $query = "UPDATE
        tbl_REVIEWS
      INNER JOIN
        tbl_USERS ON tbl_REVIEWS.id = tbl_REVIEWS.user_id
      SET
        tbl_REVIEWS.email = $email,
        tbl_REVIEWS.drink = $drink,
        tbl_REVIEWS.size = $drinkSize,
        tbl_REVIEWS.review = $review,
        tbl_REVIEWS.visitDate = $visitDate,
        tbl_REVIEWS.picture = $picture,
        tbl_REVIEWS.agreement = $agreement,
      WHERE
        tbl_USERS.firstName = $firstName
      AND
        tbl_USERS.lastName = $lastName";
    
    if ($dataBase -> query($query)) {
      echo(true);
    }
    else {
      echo(false);
    }
    
    $dataBase -> close();
  }
?>