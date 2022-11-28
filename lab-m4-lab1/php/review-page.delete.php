<?php
  /*
  // File name: review-page.delete .php
  // File date: 11/28/22
  // Programmer: Manuel Sandoz Santiago
  // Description: MISSING
  // Last update: --/--/--
  */

  $firstName = $_POST['firstName'];


  $dataBase = new mysqli('localhost', 'root', '', 'brew_review');

  if ($dataBase -> connect_error) {
    die('ERROR: Database conection failed.' . $dataBase -> connect_error);
  }
  else {
    $query = 'SELECT YADDA YADDA';

    $queryResult = $dataBase -> query($query);

    if ($queryResult -> num_rows > 0) {
      $queryDelete = 'Delete from yadda yadda';

      $deleteResult = $dataBase -> query($queryDelete);

      echo(true);
    }
    else {
      echo(false);
    }

    $dataBase -> close();

  }

?>