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

$sql = "INSERT INTO accounts (firstname, lastname, email, password)
VALUES ('" . $_GET['firstname'] . "','" . $_GET['lastname'] . "','" . $_GET['email'] . "','" . $_GET['password'] . "')";

if ($conn->query($sql) === TRUE) {
    echo "Account Created! Please Login to Continue";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>