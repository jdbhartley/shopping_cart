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

$sql = "DELETE FROM `products` WHERE `id`='" . $_GET['id'] . "'";

if ($conn->query($sql) === TRUE) {
    echo "Product Deleted";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>