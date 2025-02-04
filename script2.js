const btns = document.querySelectorAll(".btn");
const info = document.querySelector("#info-text");
const category = document.getElementById('category');
const price = document.getElementById('price');
const modal = document.querySelector('.modal');
// const modalBtn = document.querySelector('.modal-button');
const cancelBtn = document.getElementById('cancel-btn')
const customBtn = document.getElementById('custom-btn');
const table = document.getElementById('history-table');
const delBtn = document.getElementById('del-btn');
const btnForm = document.getElementById('btn-form');

let timer;
let customFlag = false;



const registerPrice = (btn) => {
    const buttonRegExp = /New Button/;

    if (!buttonRegExp.test(btn.innerHTML)) {
        info.innerHTML = `
            Purchased!<br>
            <br>
            Type: ${btn.innerText}<br>
            Price: P${btn.value}
            `;

        // updateTable(btn.innerText, btn.value);

    } else {
        info.innerHTML = `
            Please modify the button first!<br>
            <br>
            Hold the button of choice to modify.
            `;
    }
};

cancelBtn.addEventListener('click', () => {
    resetModal();
})

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        resetModal();
    }
})


function resetModal() {
    const regBtn = document.getElementById('reg-btn');
    category.value = '';
    price.value = '';
    modal.close();
}

