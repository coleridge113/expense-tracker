document.getElementById('add-btn').addEventListener('click', function(event){
    console.log('click')
    event.preventDefault();
    const btn = document.createElement('button');
    btn.setAttribute('class', 'btn');
    btn.textContent = 'New Button';
    btnForm.appendChild(btn);

    handlePresetButtonEventListener();

})


