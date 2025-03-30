<?php
include_once 'dbh.inc.php';

if (isset($_POST['id'])) {
    $id = $_POST['id'];
    $stmt = $conn->prepare("
        DELETE FROM expenses
        WHERE id = ?
        ");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();

    echo "Record deleted successfully";
} else {
    echo "No ID provided";
}

$conn->close();
exit();
