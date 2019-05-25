<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "store";

$loginsuccess = false;

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "INSERT INTO products (name, description, price, imgPath)
VALUES ('" . $_GET['name'] . "','" . $_GET['desc'] . "','" . $_GET['price'] . "','" . $_GET['imgPath'] . "')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>