<?php

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    include_once 'dbh.inc.php';

    $response = array();

    $result = $conn->query("
        DELETE FROM expense_preset
        ORDER BY id DESC
        LIMIT 1
        "
    );

    if($result){
        $response['status'] = 'success';
    } else {
        $response['status'] = 'error';
    }

    $conn->close();

    echo json_encode($response);
    exit();

} else {
    echo json_encode(['status' => 'error']);
    exit();
}
