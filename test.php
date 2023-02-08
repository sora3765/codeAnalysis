<?php
    $mysqli = new mysqli('localhost','root','','nt32');
    $sql = 'select * from test';
   foreach ($mysqli->($sql) as $row){
        print_r($row);
    }



?>
