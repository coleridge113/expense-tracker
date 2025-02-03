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

let timer;
let customFlag = false;

const btnForm = document.getElementById('btn-form');


// const addTypeBtn = () => {
//     if (btnForm) {
//         const newBtn = document.createElement('button');
//         newBtn.setAttribute('class', 'btn');
//         newBtn.innerText = 'New Button';
//         btnForm.appendChild(newBtn);

//         const btns = document.querySelectorAll(".btn");
//         console.log(btns);
//         btns.forEach(button => {
//             button.addEventListener('mousedown', handleMouseDown);
//             button.addEventListener('mouseup', handleMouseUp);
//             button.addEventListener('mouseleave', handleMouseLeave);
//         });
//     } else {
//         console.error('Element with id "btn-form" not found.');
//     }
// }

// const addBtn = document.getElementById('add-btn');
// if (addBtn) {
//     addBtn.addEventListener('click', addTypeBtn);
// } else {
//     console.error('Element with id "add-btn" not found.');
// }

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

// const modifyButton = (btn) => {
//     const newCategory = category.value.trim();
//     const newPrice = price.value.trim();

//     let changeFlag = false;

//     if (newCategory && newCategory !== btn.innerText) {
//         btn.innerText = newCategory;
//         changeFlag = true;
//     }

//     if (newPrice && newPrice !== btn.value) {
//         btn.value = newPrice;
//         changeFlag = true;
//     }

//     if (changeFlag) {
//         info.innerHTML = `
//             Modified!<br>
//             <br>
//             Type: ${btn.innerText}<br>
//             Cost: P${btn.value}
//             `;
//     }
// };

// const handleMouseDown = (event) => {
//     const categoryButton = event.target;

//     const handleModifyButton = () => {
//         modifyButton(categoryButton);
//         resetModal();
//         modalBtn.removeEventListener('click', handleModifyButton);
//     };
    
//     timer = setTimeout(() => {
//         isLongPress = true;
//         modal.showModal();
//         modalBtn.addEventListener('click', handleModifyButton);
//     }, 500);
// };

// const handleMouseUp = (event) => {
//     clearTimeout(timer);
//     if (!isLongPress) {
//         registerPrice(event.target);
//     }
//     isLongPress = false;
    
// };

// const handleMouseLeave = () => {
//     clearTimeout(timer);
//     isLongPress = false;
// };

customBtn.addEventListener('click', () => {
    modal.showModal();

    modalBtn.addEventListener('click', () => {
        const newCategory = category.value.trim();
        const newPrice = price.value.trim();

        handleCustomEntry();
        
        if (newCategory && newPrice) {
            info.innerHTML = `
                Purchased!<br>
                <br>
                Type: ${newCategory}<br>
                Cost: P${newPrice}
                `;
            updateTable(newCategory, newPrice);
        } else {
            info.innerHTML = `Invalid inputs!`;
        }

        resetModal();
    }, { once: true });
});

cancelBtn.addEventListener('click', () => {
    resetModal();
})

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        resetModal();
    }
})


function resetModal() {
    category.value = '';
    price.value = '';
    modal.close();
}

