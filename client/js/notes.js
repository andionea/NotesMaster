function run() {
    new Vue({
        el: '#notes-content',
        data: {
            user: localStorage.getItem('loggedInUser') ? JSON.parse(localStorage.getItem('loggedInUser')) : {},
            noteId: localStorage.getItem('noteId'),
            notes: []
        },
        created: function() {
            this.getNotes();
        },
        methods: {
            getNotes() {
                axios.get(`http://localhost:3000/notes/user/${this.user.UserID}`, {
                    params: {
                        userId: this.user.UserID
                    }
                }).then( response => {
                    console.log(response.data);
                    this.notes = response.data;
                    console.log(this.notes);
                });
            },

            gotoQuiz: function(noteId) {
                localStorage.setItem('noteId', noteId);
                window.location.href = 'quiz.html';
            },

            gotoContent: function(noteId) {
                window.location.href = 'http://localhost:3000/notes/' + noteId;
            },
        },
        filters: {
            formatDate(value) {
                if (!value) return '';
                let date = new Date(value);
                return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    run();
});
