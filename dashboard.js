
function loadUsers() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.forEach((user, index) => {
        const li = document.createElement('li');
        li.textContent = user.username;
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.onclick = () => {
            users.splice(index, 1);
            localStorage.setItem('users', JSON.stringify(users));
            loadUsers();
        };
        li.appendChild(delBtn);
        userList.appendChild(li);
    });
}

function addUser() {
    const username = document.getElementById('newUsername').value.trim();
    const password = document.getElementById('newPassword').value.trim();
    if (username && password) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        document.getElementById('newUsername').value = '';
        document.getElementById('newPassword').value = '';
        loadUsers();
    }
}

document.addEventListener('DOMContentLoaded', loadUsers);
