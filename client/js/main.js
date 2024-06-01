function run() {
    new Vue({
        el: '#container',
        data: {
            user: localStorage.getItem('loggedInUser') ? JSON.parse(localStorage.getItem('loggedInUser')) : {},
            text:"",
            title: "",
            questions: [],
            isLoading: false
        },
        created: function() {
            this.getUser();
        },
        methods: {
            getUser() {
                console.log(this.user);
            },

            makeQuiz: function() {
                this.isLoading = true;
                this.text = document.getElementById('text').value;
                if (this.text === '') {
                    alert('Please write your notes');
                    return;
                }
                else {
                    axios.get('http://localhost:2000', {
                        params: {
                            text: this.text
                        }
                    }).then( response => {
                        this.title = response.data.title;
                        this.questions = response.data.questions;
                        localStorage.setItem('noteTitle', this.title);
                        //console.log(response);
                        //console.log("Titlul: " + this.title);
                        //console.log(this.questions);

                        axios.put('http://localhost:3000/notes', {
                            userId: this.user.UserID,
                            title: this.title,
                            content: this.text
                        }).then( response => {
                            document.getElementById('text').value = '';
                            this.text = '';
                            localStorage.setItem('noteId', response.data.id);
                        })
                        .then( () => {
                            console.log(localStorage.getItem('noteId'));
                            
                            for (let i = 0; i < this.questions.length; i++) {
                                axios.put('http://localhost:3000/questions', {
                                    noteId: localStorage.getItem('noteId'),
                                    question: this.questions[i].question,
                                    answer: this.questions[i].answer
                                }).then( response => {
                                    //console.log(response.data);
                                    if (i === this.questions.length - 1) {
                                        this.isLoading = false;
                                        window.location.href = 'quiz.html';
                                    }
                                });
                            }
                        });
                    })
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    run();
});
