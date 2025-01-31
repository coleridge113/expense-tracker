document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        const id = this.getAttribute('data-id');
        const row = document.getElementById('row-' + id);

        if (row) {
            row.remove();
        }

        fetch('includes/deleteExpense.inc.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'id=' + encodeURIComponent(id),
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            if (data !== "Record deleted successfully") {
                alert('Deletion failed: ' + data);
            }
        })
        .catch(error => console.error('Error:', error));
    });
});
