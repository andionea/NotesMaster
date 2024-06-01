function run() {
    new Vue({
        el: '.center-content',
        data: {
            user: localStorage.getItem('loggedInUser') ? JSON.parse(localStorage.getItem('loggedInUser')) : {},
        },
        created: function() {
        },
        methods: {
            logout: function() {
                localStorage.clear();
                window.location.href = 'index.html';
            },

            showPasswordInput: function() {
                var newPasswordGroup = document.getElementById('new-password-group');
                newPasswordGroup.classList.remove('hidden');
            },

            modifyPassword: function() {
                var newPassword = document.getElementById('newPasswordInput').value;
                if (newPassword === '') {
                    alert('Please enter a new password');
                    return;
                }
                axios.post('http://localhost:3000/users', {
                    id: this.user.UserID,
                    username: this.user.Username,
                    email: this.user.Email,
                    password: newPassword
                }).then( response => {
                    console.log(response.data);
                    this.user.Password = newPassword;
                    localStorage.setItem('loggedInUser', JSON.stringify(this.user));
                    alert('Password has been successfully modified!');
                    document.getElementById('new-password-group').classList.add('hidden');
                    window.location.href = 'profil.html';
                });
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    run();
    user = JSON.parse(localStorage.getItem('loggedInUser'));
    document.getElementById('username').value = user.Username;
    document.getElementById('email').value = user.Email;
    document.getElementById('password').value = user.Password;
});
