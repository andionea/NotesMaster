function run() {
    new Vue({
        el: '#quiz-content',
        data: {
            user: localStorage.getItem('loggedInUser') ? JSON.parse(localStorage.getItem('loggedInUser')) : {},
            noteId: localStorage.getItem('noteId'),
            questions: []
        },
        created: function() {
            this.getQuestions();
        },
        methods: {
            getQuestions() {
                axios.get(`http://localhost:3000/questions/note/${this.noteId}`, {
                    params: {
                        noteId: this.noteId
                    }
                }).then( response => {
                    console.log(response.data);
                    this.questions = response.data.map(question => ({...question, showAnswer: false}));
                    console.log(this.questions);
                });
            },

            toggleAnswer(index) {
                this.questions[index].showAnswer = !this.questions[index].showAnswer;
            }

            
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    run();
});
