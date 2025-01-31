<?php

$servername = 'localhost';
$username = 'root';
$password = 'root';
$dbname = 'expense_project_db';

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Database failed to connect: " . $conn->connect_error);
}
