// let timer;

document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener('mousedown', function (event) {
        event.preventDefault();
        const currBtn = this;
        timer = setTimeout(function () {
            handleLongClick(currBtn)
        }, 500);
    })

    button.addEventListener('mouseup', function () {
        clearTimeout(timer);
    })

    button.addEventListener('mouseleave', function () {
        clearTimeout(timer);
    })

    button.addEventListener('click', function (event) {
        event.preventDefault();
        clearTimeout(timer);
        const item = button.textContent;
        const price = button.getAttribute('value');

        const table = document.getElementById("history-table");
        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${item}</td>
        <td>P ${price}</td>
        <td id='date-time'>${formatDateTime()}</td>
        <td class="del-row">
            <form method="POST" action="includes/deleteExpense.inc.php" class="deleteForm">
                <input type="hidden" name="id">
                <button type="button" class="delete-btn">del</button>
            </form>
        </td>
        `;

        table.appendChild(row);

        const formData = new URLSearchParams();
        formData.append('item', item);
        formData.append('cost', price);

        fetch('includes/addExpense.inc.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString()
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                row.setAttribute('id', 'row-' + data['id']);
                row.querySelector(".delete-btn").setAttribute('data-id', data['id']);
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
    })
})

function formatDateTime() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
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

function handleLongClick(button) {
    const regBtn = document.getElementById('reg-btn');
    modal.showModal();

    regBtn.addEventListener('click', function () {
        console.log('click');
        const newCategory = document.getElementById('category').value.trim();
        const newPrice = document.getElementById('price').value.trim();
        let changeFlag = false;

        console.log(newCategory, newPrice);

        if (newCategory && newCategory !== button.textContent) {
            button.textContent = newCategory;
            changeFlag = true;
        }

        if (newPrice && newPrice !== button.value) {
            button.value = newPrice;
            changeFlag = true;
        }

        if (changeFlag) {
            info.innerHTML = `
            Modified!<br>
            <br>
            Type: ${button.textContent}<br>
            Cost: P${button.value}
            `;

            resetModal();
        }
    })
}