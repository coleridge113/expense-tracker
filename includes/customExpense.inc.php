<?php
include_once 'dbh.inc.php';
include_once 'functions.inc.php';

$response = array();

header('Content-Type: application/json');

if (isset($_POST['item']) || !empty($_POST['item']) || isset($_POST['cost']) || !empty($_POST['cost'])) {
    $item = $_POST['item'];
    $cost = $_POST['cost'];

    $stmt = $conn->prepare("
        INSERT INTO expenses (item, cost)
        VALUES(?, ?)
    ");
    if ($stmt === false) {
        $response['status'] = 'error';
        $response['message'] = 'Prepare failed: ' . htmlspecialchars($conn->error);
        echo json_encode($response);
        exit();
    }

    $stmt->bind_param("sd", $item, $cost);
    if (!$stmt->execute()) {
        $response['status'] = 'error';
        $response['message'] = 'Execute failed: ' . htmlspecialchars($stmt->error);
        echo json_encode($response);
        exit();
    }

    $stmt->close();

    $response['status'] = 'success';
    $response['message'] = 'Record added successfully';
    $response['id'] = getId($conn);
} else {
    $response['status'] = 'error';
    $response['message'] = 'Invalid inputs';
}

$conn->close();

echo json_encode($response);
exit();
