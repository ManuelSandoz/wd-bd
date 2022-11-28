<?php

  $firstName = $_POST['firstName'];

  $dataBase = new mysqli('localhost', 'root', '', 'brew_review');

  if ($dataBase -> connect_error) {
    die('ERROR: Database conection failed' . $dataBase -> connect_error);
  }
  else {
    $query = 'SELECT yadda yadda';

    $result = $dataBase -> query($query);

    if ($result -> num_rows > 0) {

      while ($row = $result -> fetch_assoc()){
        $reviewRecord = array(
          'firstName' => $row['firstName'],
          'yaddayadda'
        );

        echo json_encode($reviewRecord);
      }
    }
    else {
      echo(false);
    }

    $dataBase -> close();
  }

?>