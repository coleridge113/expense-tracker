document.getElementById('add-btn').addEventListener('click', function(event){
    console.log('click')
    event.preventDefault();
    const btn = document.createElement('button');
    btn.setAttribute('class', 'btn');
    btn.setAttribute('type', 'button');
    btn.textContent = 'New Button';
    btnForm.appendChild(btn);
    
    fetch('../includes/addPresetButton.inc.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    // .then(response => response.json())
    // .then(data => {
    //     console.log(data);
    //     // btn.setAttribute('id', data.id);
    //     if(data.status !== 'success'){
    //         btn.remove();
    //     }
    // })
    // .catch(error => {
    //     console.error('Error', error);
    //     btn.remove();
    // })
})