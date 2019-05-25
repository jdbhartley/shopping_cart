<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "store";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT id, name, description, price, imgPath FROM products";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo $row["id"]. ":" . $row["name"] . ":" . $row["description"] . ":" . $row["price"] . ":" . $row["imgPath"] . ":";
    }
} else {
    echo "0 results";
}
$conn->close();
?>