<?php

function displayExpenseButtons($conn)
{
    $result = $conn->query("SELECT * FROM expense_preset;");

    if (!$result) {
        die("Query failed: " . htmlspecialchars($conn->error));
    }

    while ($row = $result->fetch_assoc()) {
        echo '
            <button class="btn" value="' . htmlspecialchars($row["cost"]) . '">' . htmlspecialchars($row["item"]) . '</button>
        ';
    }
}

function addItem($conn, $item, $cost)
{
    $stmt = $conn->prepare("
        INSERT INTO expense_preset (item, cost) 
        VALUES (?, ?)
        ");
    $stmt->bind_param("sd", $item, $cost);
    $stmt->execute();
    $stmt->close();
}

function deleteItem($conn, $id)
{
    $stmt = $conn->prepare("
        DELETE FROM expense_preset 
        WHERE id = ?
    ");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();
}

function displayExpenseTable($conn)
{
    $stmt = $conn->prepare("
        SELECT *
        FROM expenses
    ");
    $stmt->execute();
    $result = $stmt->get_result();

    while ($row = $result->fetch_assoc()) {
        $dateTime = new DateTime($row['date']);
        $formattedDate = $dateTime->format('m-d-Y');
        $timeOfDay = $dateTime->format('A');

        echo '
            <tr id="row-' . htmlspecialchars($row['id']) . '">
                <td>' . htmlspecialchars($row['item']) . '</td>
                <td>P ' . htmlspecialchars($row['cost']) . '</td>
                <td>' . $formattedDate . ' ' . $timeOfDay . '</td>
                <td class="del-row">
                    <form method="POST" action="includes/deleteExpense.inc.php" class="deleteForm">
                        <input type="hidden" name="id" value="' . htmlspecialchars($row['id']) . '">
                        <button type="button" class="delete-btn" data-id="' . htmlspecialchars($row['id']) . '">del</button>
                    </form>
                </td>
            </tr>
        ';
    }

    $stmt->close();
}

function writeExpenseEntry($conn, $item, $cost)
{
    $stmt = $conn->prepare("
        INSERT INTO expenses (item, cost)
        VALUES(?, ?)
        ");
    $stmt->bind_param("sd", $item, $cost);
    $stmt->execute();
    $stmt->close();
}

function validateId($conn, $id)
{
    $stmt = $conn->prepare("
        SELECT *
        FROM expenses
        WHERE id = ?
    ");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result && $result->num_rows > 0) {
        return true;
    } else {
        return false;
    }
    $stmt->close();
}

function getId($conn) {
    $result = $conn->query("
        SELECT *
        FROM expenses
        ORDER BY date DESC
        LIMIT 1
    ");

    if($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        return $row['id'];
    } else {
        return null;
    }
}
