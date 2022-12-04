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
      FROM 
        tbl_USERS AS u
      JOIN 
        tbl_REVIEWS AS r 
      ON 
        u.id = r.user_id
      WHERE 
        u.firstName = '$firstName'
      AND 
        u.lastName = '$lastName'";

    $queryResult = $dataBase -> query($query);

    if ($queryResult -> num_rows > 0) {
      $reviewDeleteQuery = "DELETE R
        FROM 
          tbl_REVIEWS AS R  
        JOIN 
          tbl_USERS AS U
        ON 
        U.id = R.user_id  
        WHERE 
        U.firstName = '$firstName'
        AND
        U.lastName = '$lastName'";

      $userDeleteQuery = "DELETE 
      FROM tbl_USERS
      WHERE 
      tbl_USERS.firstName = '$firstName'
      AND
      tbl_USERS.lastName = '$lastName'";

      $reviewDeleteResult = $dataBase -> query($reviewDeleteQuery);
      $userDeleteResult = $dataBase -> query($userDeleteQuery);

      echo(true);
    }
    else {
      echo(false);
    }

    $dataBase -> close();

  }

?>