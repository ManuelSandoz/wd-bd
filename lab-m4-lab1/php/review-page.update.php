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
  $agreement = $_POST['agreement'];

  // Establishing connection to the DB
  $dataBase = new mysqli('localhost', 'root', '', 'brew_review');

  if ($dataBase -> connect_error) {
    die('ERROR: Database connection failed. ' . $dataBase -> connect_error);
  }
  else { 
    $query = 'UPDATE TBL 
      WRITE TEH THING HERE';
    
    if ($dataBase -> query($query)) {
      echo(true);
    }
    else {
      echo(false);
    }
    
    $dataBase -> close();
  }
?>