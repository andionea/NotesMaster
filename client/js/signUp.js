function run() {
    new Vue({
        el: '.container',
        data: {
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        },
        created: function() {
        },
        methods: {
            signUp: async function() {
                this.email = document.getElementById('email').value;
                this.username = document.getElementById('username').value;
                this.password = document.getElementById('password').value;
                this.confirmPassword = document.getElementById('confirm_password').value;
            
                var ok = await this.handleAccount();
                console.log(ok);
            
                if (ok !== 0) {
                    axios.put('http://localhost:3000/users', {
                        email: this.email,
                        username: this.username,
                        password: this.password
                    }).then( response => {
                        alert('User created');
                        window.location.href = 'index.html';
                    });
                }
            },

            gotoSignIn: function() {
                window.location.href = 'index.html';
            },

            handleAccount: async function() {
                let response = await axios.get('http://localhost:3000/users');
                let users = response.data;
            
                if (this.email === '' || this.username === '' || this.password === '' || this.confirmPassword === '') {
                    alert('Please enter all fields');
                    return 0;
                }

                let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

                if (!emailRegex.test(this.email)) {
                    alert('Invalid email');
                    return 0;
                }

                let usernameRegex = /^[a-zA-Z][a-zA-Z0-9._]*$/;

                if (!usernameRegex.test(this.username)) {
                    alert('Username must start with a letter and can only contain letters, numbers, periods, and underscores');
                    return 0;
                }

                if (this.username.length < 4) {
                    alert('Username must be at least 4 characters long');
                    return 0;
                }

                if (this.password.length < 4) {
                    alert('Password must be at least 4 characters long');
                    return 0;
                }
            
                for (let i = 0; i < users.length; i++) {
                    if (users[i].Email === this.email) {
                        alert('Email already in use');
                        return 0;
                    }
                    if (users[i].Username === this.username) {
                        alert('Username already in use');
                        return 0;
                    }
                }
            
                if (this.username.includes(' ')) {
                    alert('Username cannot contain spaces');
                    return 0;
                }
            
                if (this.password.includes(' ')) {
                    alert('Password cannot contain spaces');
                    return 0;
                }

                if (this.password !== this.confirmPassword) {
                    alert('Passwords do not match');
                    return 0;
                }
            
                // Rest of your code...
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    run();
});
