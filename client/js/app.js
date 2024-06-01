function run() {
    new Vue({
        el: '.container',
        data: {
            users: [],
            username: '',
            password: ''
        },
        created: function() {
            this.getUsers();
        },
        methods: {
            verifyUser: function() {
                localStorage.clear();
                this.username = document.getElementById('username').value;
                this.password = document.getElementById('password').value;

                if (this.username === '' || this.password === '') {
                    alert('Please enter a username and password');
                    return;
                }

                for (let i = 0; i < this.users.length; i++) {
                    if (this.users[i].Username === this.username && this.users[i].Password === this.password) {
                        localStorage.setItem('loggedInUser', JSON.stringify(this.users[i]));
                        window.location.href = 'main.html';
                        return;
                    } 
                }
                alert('Invalid username or password');
                return;
            },

            gotoSignUp: function() {
                window.location.href = 'signup.html';
            },

            getUsers() {
                axios.get('http://localhost:3000/users').then( response => {
                    this.users = response.data;
                });
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    run();
});
