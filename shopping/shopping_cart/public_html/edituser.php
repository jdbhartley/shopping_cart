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

$sql = "UPDATE accounts SET firstname='" .$_GET["first"] ."', lastname='" . $_GET["last"] . "', email='" . $_GET["email"] . "', password='" . $_GET["pass"] . "' WHERE id='" . $_GET["id"] . "'";

if ($conn->query($sql) === TRUE) {
    echo "Product Updated Successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>