const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const option = button.id;
        vote(option);
    });
});

function vote(option) {
    fetch('/vote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ option })
    })
    .then(response => {
        if (response.ok) {
            alert('Vote submitted successfully!');
        } else {
            alert('Failed to submit vote.');
        }
    })
    .catch(error => console.error('Error:', error));
}
