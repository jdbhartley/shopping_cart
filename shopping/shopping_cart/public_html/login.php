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

$sql = "SELECT `id`, `firstname`, `password` FROM `accounts` WHERE `email`='" . $_GET["email"] . "'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        if ($row["password"] == $_GET["password"]) {
            $loginsuccess = true;
            setcookie("firstname", $row["firstname"]);
            setcookie("userid", $row["id"]);
            echo "logged in";
        }
        else {
            echo "password incorrect";
        }
    }
} else {
    echo "0 results";
}
$conn->close();
?>