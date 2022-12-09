<?php
  /*
  // File name: review-page.insert.php
  // File date: 11/25/22
  // Programmer: Manuel Sandoz Santiago
  // Description: File contains the PHP code utilized to preform the INSERT query on the brew_review database
  // Last update: 12/9/22
  */

  // FUTURE WORK
  // 1. Create Users so 1 person can have multiple reviews

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

  // Create a connection to the database
  $dataBase = new mysqli('localhost', 'root', '', 'brew_review');

  if ($dataBase->connect_error) {
    die('ERROR: Database connection failed.' . $dataBase -> connect_error);
  }
  else {
    $queryUser = $dataBase -> prepare('INSERT INTO tbl_USERS(firstName, lastName) VALUES(?,?)');
    $queryUser -> bind_param('ss', $firstName, $lastName);

    if ($queryUser -> execute() === TRUE) {

      // Getting the auto generated id from tbl_USERS
      $id = $dataBase -> insert_id; 

      $queryReview = $dataBase -> prepare('INSERT INTO tbl_REVIEWS(email, drink, size, review, visitDate, picture, agreement, user_id) VALUES (?,?,?,?,?,?,?,?)');
      $queryReview -> bind_param('ssssssii', $email, $drink, $drinkSize, $review, $visitDate, $picture, $agreement, $id);

      if($queryReview -> execute() === TRUE) {
        echo(true);
      }
      else {

        echo(false);
      }

      echo(true);
    } 
    else {
      echo(false);
    }

    $dataBase -> close();
    $queryUser -> close();
    $queryReview -> close();
  }
?>