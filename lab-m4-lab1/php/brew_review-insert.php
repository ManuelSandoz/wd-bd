<?php
  /*
  // File name: MISSING
  // File date: 11/25/22
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


  // Create a connection to the database
  $dataBase = new mysqli('localhost', 'root', '', 'brew_review')

  if ($dataBase->connect_error) {
    die('ERROR: Database connection failed.' . $dataBase->connect_error)
  }
  else {

    //before I send the data I want to make sure that the user uploading is not an existing user on the db 
    // $query = $dataBase.prepare("insert into tbl_")
    // Recording 17
    // min 40:20

    print('This is in php sucess')

    $dataBase->close();
    $query->close();
  }
?>