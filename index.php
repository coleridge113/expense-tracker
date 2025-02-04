<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/style.css">
    <title>Budget</title>
</head>
<?php
include_once 'includes/dbh.inc.php';
include_once 'includes/functions.inc.php';
?>


<body>
    <div class="container main-container">
        <div class="container sub-container btn-block">
            <div class="util-container">
                <button id="add-btn" type="button">Add</button>
                <button id="del-btn">Delete</button>
                <button class="custom-btn" id="custom-btn">Custom</button>
            </div>
            <form class="btn-form" id="btn-form" action="#" method='POST'>
                <?php
                displayExpenseButtons($conn);
                ?>
            </form>
        </div>
        <dialog class="modal" id="modal">
            <form class="modal-form" action="includes/addExpense.inc.php" method="POST">
                <input type="text" id="category" name="item" placeholder="Expense">
                <input type="number" id="price" name="cost" placeholder="Cost">
                <div class="modal-btn-container">
                    <button class="modal-button" id="reg-btn" type="button">Register</button>
                    <button class="modal-button" id="cancel-btn" type="button">Cancel</button>
                </div>
            </form>
        </dialog>

        <div class="container sub-container info-block">
            <p id="info-text">

            </p>
            <div class="sandbox" id="history-block">
                <table id="history-table">
                    <tr>
                        <th>Item</th>
                        <th>Cost</th>
                        <th>Date</th>
                    </tr>
                    <?php
                    displayExpenseTable($conn);
                    ?>
                </table>
            </div>
        </div>
    </div>
    <?php
    $conn->close();
    ?>
</body>
<!-- <script src="script.js"></script> -->
<script src="script2.js"></script>
<script src="scripts/addRowEntry.js"></script>
<script src="scripts/customRowEntry.js"></script>
<script src="scripts/deleteRowEntry.js"></script>
<script src="scripts/addPresetButton.js"></script>
<script src="scripts/deletePresetButton.js"></script>

</html>