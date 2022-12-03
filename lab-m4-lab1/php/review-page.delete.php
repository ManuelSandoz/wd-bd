<?php
  /*
  // File name: review-page.delete .php
  // File date: 11/28/22
  // Programmer: Manuel Sandoz Santiago
  // Description: MISSING
  // Last update: --/--/--
  */

  $firstName = $_POST['firstName'];
  $lastName = $_POST['lastName'];


  $dataBase = new mysqli('localhost', 'root', '', 'brew_review');

  if ($dataBase -> connect_error) {
    die('ERROR: Database conection failed.' . $dataBase -> connect_error);
  }
  else {
    $query = "SELECT * 
      FROM tbl_USERS
      JOIN tbl_USERS ON tbl_USERS.id = tbl_REVIEWS
      WHERE 
        firstName = $firstName,
      AND 
        lastName = $lastName";

    $queryResult = $dataBase -> query($query);

    if ($queryResult -> num_rows > 0) {
    $queryDelete = "DELETE [target table]  
        FROM 
          [table1]  
        JOIN 
          [table2]  
        ON 
          [table1.[joining column] = [table2].[joining column]  
        WHERE 
          [condition]";

      // $deleteResult = $dataBase -> query($queryDelete);

      echo($queryResult);
    }
    else {
      echo(false);
    }

    $dataBase -> close();

  }

?>