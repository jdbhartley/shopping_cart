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

$sql = "UPDATE products SET name='" .$_GET["name"] ."', description='" . $_GET["desc"] . "', price='" . $_GET["price"] . "', imgPath='" . $_GET["imgPath"] . "' WHERE id='" . $_GET["id"] . "'";

if ($conn->query($sql) === TRUE) {
    echo "Product Updated Successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>