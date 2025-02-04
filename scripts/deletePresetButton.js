document.getElementById('del-btn').addEventListener('click', function (event) {
    event.preventDefault();
    if (!btnForm.lastElementChild) {
        console.log("No preset buttons to delete");
        return;
    }

    btnForm.removeChild(btnForm.lastElementChild);

    fetch('../includes/deletePresetButton.inc.php', {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.status === 'success'){
                console.log('Button deleted successfully');
            } else {
                console.log('Button not deleted');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        })

})