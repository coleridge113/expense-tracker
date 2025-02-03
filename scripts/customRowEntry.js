// customBtn.addEventListener('click', handleCustomEntry());

document.getElementById('custom-btn').addEventListener('click', () => {
    modal.showModal();
    handleCustomEntry();
});
function handleCustomEntry() {
    document.getElementById("reg-btn").addEventListener('click', function (event) {
        event.preventDefault();

        const item = document.getElementById("category");
        const price = document.getElementById("price");
        const table = document.getElementById("history-table");
        const row = document.createElement("tr");
        const info = document.getElementById("info-text");
        const modal = document.getElementById("modal");

        if (!item.value || item.value === 0 || !price.value || price.value === 0) {
            info.innerHTML = 'Invalid inputs!';
            resetModal();
            return;
        }

        row.innerHTML = `
        <td>${item.value}</td>
        <td>P ${(price.value / 1.0).toFixed(2)}</td>
        <td id='date-time'>${formatDateTime()}</td>
        <td class="del-row">
            <form method="POST" action="includes/deleteExpense.inc.php" class="deleteForm">
                <input type="hidden" name="id">
                <button type="button" class="delete-btn">del</button>
            </form>
        </td>
    `;

        table.appendChild(row);

        if (modal) {
            modal.close();
            console.log("Modal closed");
        } else {
            console.error("Modal element not found");
        }

        const formData = new URLSearchParams();
        formData.append('item', item.value);
        formData.append('cost', price.value);

        fetch('includes/customExpense.inc.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString()
        })
            .then(response => response.json())
            .then(data => {
                row.setAttribute('id', 'row-' + data['id']);
                row.querySelector(".delete-btn").setAttribute('data-id', data['id']);
                console.log(data);
                if (data.status !== 'success') {
                    alert('Entry addition failed: ' + data.message);
                    row.remove();
                }
                callDeleteEventListener();
            })
            .catch(error => {
                console.error('Error:', error);
                row.remove();
            });

        resetModal();
    }, { once: true });
}

function formatDateTime() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const year = now.getFullYear();
    const hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedDate = `${month}-${day}-${year} ${ampm}`;

    console.log(formattedDate);
    return formattedDate;
}

function callDeleteEventListener() {
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function (event) {
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

}