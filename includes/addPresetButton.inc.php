<?php

include_once 'dbh.inc.php';
include_once 'functions.inc.php';

$response = array();

header('Content-Type: application/json');

// Check if the connection is established
if ($conn === false) {
    $response['status'] = 'error';
    $response['message'] = 'Database connection failed';
    echo json_encode($response);
    exit();
}

$result = $conn->query("
    INSERT INTO expense_preset(item)
    VALUES('New Button')
");

if ($result) {
    $response['status'] = 'success';
    // $response['id'] = getIdPresetButton($conn); // Ensure getId function is defined correctly
    displayExpenseButtons($conn);
} else {
    $response['status'] = 'error';
    $response['message'] = 'Failed to insert record';
}

$conn->close();

echo json_encode($response);
exit();
?>
