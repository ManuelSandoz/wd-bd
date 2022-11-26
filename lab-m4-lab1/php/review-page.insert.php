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
  $dataBase = new mysqli('localhost', 'root', '', 'brew_review');

  if ($dataBase->connect_error) {
    die('ERROR: Database connection failed.' . $dataBase->connect_error);
  }
  else {
    // $query = $dataBase.query(
    //   'SELECT id 
    //   FROM tbl_USERS 
    //   WHERE firstName = $firstName 
    //   AND lastName = $lastName'
    //   )

    // print($query);

    //before I send the data I want to make sure that the user uploading is not an existing user on the db 
    $query = $dataBase->prepare("insert into tbl_USERS(firstName, lastName) VALUES(?,?)");

    $query->bind_param("ss", $firstName, $lastName);
    // Recording 17
    // min 40:20

    if ($query->execute() === TRUE) {
      echo(true);
    } 
    else {
      echo(false);
    }

    $dataBase->close();
    $query->close();
  }
?>