// js/script.js

document.addEventListener('DOMContentLoaded', () => {
    const createGroupBtn = document.getElementById('create-group');
    const joinGroupBtn = document.getElementById('join-group');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (createGroupBtn) {
        createGroupBtn.addEventListener('click', () => {
            // Code pour créer un groupe
            const groupName = prompt('Entrez le nom du groupe');
            if (groupName) {
                // Appel API pour créer un groupe
                fetch('/api/groups/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify({ name: groupName }),
                })
                .then(response => response.json())
                .then(data => {
                    alert('Groupe créé avec succès');
                    // Actualiser la liste des groupes
                    loadGroups();
                })
                .catch(error => console.error('Error:', error));
            }
        });
    }

    if (joinGroupBtn) {
        joinGroupBtn.addEventListener('click', () => {
            // Code pour rejoindre un groupe
            const groupId = prompt('Entrez l\'ID du groupe à rejoindre');
            if (groupId) {
                // Appel API pour rejoindre un groupe
                fetch(`/api/groups/join/${groupId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                .then(response => response.json())
                .then(data => {
                    alert('Vous avez rejoint le groupe');
                    // Actualiser la liste des groupes
                    loadGroups();
                })
                .catch(error => console.error('Error:', error));
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('token', data.token);
                window.location.href = 'index.html';
            })
            .catch(error => console.error('Error:', error));
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            })
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('token', data.token);
                window.location.href = 'index.html';
            })
            .catch(error => console.error('Error:', error));
        });
    }

    function loadGroups() {
        // Charger et afficher les groupes
        fetch('/api/groups', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then(response => response.json())
        .then(data => {
            const groupsList = document.getElementById('groups-list');
            groupsList.innerHTML = '';
            data.forEach(group => {
                const groupDiv = document.createElement('div');
                groupDiv.classList.add('group');
                groupDiv.innerHTML = `
                    <h2>${group.name}</h2>
                    <p>Admin: ${group.adminId}</p>
                    <p>Membres: ${group.members.length}</p>
                    <button onclick="viewGroup(${group.id})">Voir le Groupe</button>
                `;
                groupsList.appendChild(groupDiv);
            });
        })
        .catch(error => console.error('Error:', error));
    }
});
