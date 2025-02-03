<?php
include_once 'dbh.inc.php';
include_once 'functions.inc.php';

$response = array();

header('Content-Type: application/json');

if (isset($_POST['item']) || !empty($_POST['item']) || isset($_POST['cost']) || !empty($_POST['cost'])) {
    $item = $_POST['item'];
    $cost = $_POST['cost'];
    $id = $_POST['id'];

    $stmt = $conn->prepare("
        UPDATE 
            expense_preset
        SET item = ?,
            cost = ?
        WHERE
            id = ?;
    ");
    $stmt->bind_param("sdi", $item, $cost, $id);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo "Record updated successfully";
    } else {
        echo "No record updated.";
    }

    $stmt->close();

    $response['status'] = 'success';
    $response['message'] = 'Button modified successuflly';
} else {
    $repsonse['status'] = 'error';
}

$conn->close();

echo json_encode($response);
exit();
