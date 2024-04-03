document.querySelector('#register-btn').addEventListener('click', async () => {
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    const response = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
    if (response.status === 201) {
        window.location.href = '/';
    } else {
        alert('Failed to register.');
    }
});

document.querySelector('#login-btn').addEventListener('click', async () => {
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
    if (response.status === 200) {
        window.location.href = '/';
    } else {
        alert('Failed to login.');
    }
});
