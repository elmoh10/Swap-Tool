document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('role', 'admin');
        window.location.href = 'dashboard.html';
    } else if (storedUsers.some(user => user.username === username && user.password === password)) {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('role', 'user');
        localStorage.setItem('currentUser', username);
        window.location.href = 'home.html';
    } else {
        document.getElementById('error').innerText = "Incorrect Username or Password. Please try again.";
    }
});
