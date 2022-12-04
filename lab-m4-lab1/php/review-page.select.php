<?php
  /*
  // File name: review-page.select.php
  // File date: 11/28/22
  // Programmer: Manuel Sandoz Santiago
  // Description: MISSING
  // Last update: --/--/--
  */

  $firstName = $_POST['firstName'];
  $lastName = $_POST['lastName'];

  $dataBase = new mysqli('localhost', 'root', '', 'brew_review');

  if ($dataBase -> connect_error) {
    die('ERROR: Database conection failed' . $dataBase -> connect_error);
  }
  else {
    $query = "SELECT * 
    FROM tbl_REVIEWS
    JOIN tbl_USERS ON tbl_REVIEWS.user_id = tbl_USERS.id
    WHERE firstName = '$firstName'
    AND lastName = '$lastName'";

    $result = $dataBase -> query($query);

    if ($result -> num_rows > 0) {

      while ($row = $result -> fetch_assoc()){
        $reviewRecord = array(
          'firstName' => $row['firstName'],
          'lastName' => $row['lastName'],
          'email' => $row['email'],
          'drink' => $row['drink'],
          'size' => $row['size'],
          'review' => $row['review'],
          'visitDate' => $row['visitDate'],
          'picture' => $row['picture'],
          'agreement' => $row['agreement']
        );

        echo(json_encode($reviewRecord));
      }
    }
    else {
      echo(false);
    }

    $dataBase -> close();
  }

?>