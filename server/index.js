let express = require('express');
const mysql = require('mysql2/promise');
let cors = require('cors');
let fetch = require('node-fetch');
let app = express();
app.use(cors());
let bodyParser = require('body-parser');


app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());
let pool;

// Users
app.get('/', (request, response) => {
    console.log(`Request received from: ${request.headers.host} `);
    response.json('NodeJS REST API');
});

app.get('/users', async (request, response) => {
    let users = await getUsersFromDb();
    response.json(users);
});

app.get('/users/:id', async (request, response) => {
    let user = await getUserFromDbById(request.params.id);
    response.json(user);
});

app.put('/users', async (request, response) => {
    let res = await saveUserToDb(request.body);
    response.json({id: res.insertId});
});

app.post('/users', async (request, response) => {
    let res = await updateUser(request.body);
    response.json({ res } );
});

app.delete('/users/:id', async (request, response) => {
    let res = await deleteUserFromDbById(request.params.id);
    response.json(res);
});

async function getUserFromDbById(id) {
    return executeQuery(`SELECT * FROM Users WHERE UserID='${id}'`);
}

async function getUsersFromDb() {
    return executeQuery('SELECT * FROM Users');
}

async function saveUserToDb(user) {
    return executeQuery(`INSERT INTO Users (Username, Email, Password) VALUES ('${user.username}', '${user.email}', '${user.password}')`);
}

async function updateUser(user) {
    return executeQuery(`UPDATE Users SET Username='${user.username}', Email='${user.email}', Password='${user.password}' WHERE UserID=${user.id}`);
}

async function deleteUserFromDbById(id) {
    return executeQuery(`DELETE FROM Users WHERE UserID=${id}`);
}

// Notes
app.get('/notes', async (request, response) => {
    let notes = await getNotesFromDb();
    response.json(notes);
});

app.get('/notes/:id', async (request, response) => {
    let note = await getNoteFromDbById(request.params.id);
    response.json(note);
});

app.get('/notes/title', async (request, response) => {
    let note = await getNoteIDFromDbByTitle(request.params.title);
    response.json(note);
});

app.get('/notes/user/:userId', async (request, response) => {
    let notes = await getNotesByUserId(request.params.userId);
    response.json(notes);
});

app.put('/notes', async (request, response) => {
    let res = await saveNoteToDb(request.body);
    response.json({id: res});
});

app.post('/notes', async (request, response) => {
    let res = await updateNote(request.body);
    response.json({ res } );
});

app.delete('/notes/:id', async (request, response) => {
    let res = await deleteNoteFromDbById(request.params.id);
    response.json(res);
});

async function getNoteFromDbById(id) {
    return executeQuery(`SELECT * FROM Notes WHERE NoteID='${id}'`);
}

async function getNoteIDFromDbByTitle(title) {
    return executeQuery(`SELECT NoteID FROM Notes WHERE Title='${title}'`);
}

async function getNotesByUserId(userId) {
    return executeQuery(`SELECT * FROM Notes WHERE UserID='${userId}'`);
}

async function getNotesFromDb() {
    return executeQuery('SELECT * FROM Notes');
}

async function saveNoteToDb(note) {
    const result = await executeQuery(`INSERT INTO Notes (UserID, Title, Content) VALUES ('${note.userId}', '${note.title}', '${note.content}')`);
    return result.insertId;
}

async function updateNote(note) {
    return executeQuery(`UPDATE Notes SET Title='${note.title}', Content='${note.content}' WHERE NoteID=${note.id}`);
}

async function deleteNoteFromDbById(id) {
    return executeQuery(`DELETE FROM Notes WHERE NoteID=${id}`);
}

// Questions
app.get('/questions', async (request, response) => {
    let questions = await getQuestionsFromDb();
    response.json(questions);
});

app.get('/questions/:id', async (request, response) => {
    let question = await getQuestionFromDbById(request.params.id);
    response.json(question);
});

app.get('/questions/note/:noteId', async (request, response) => {
    let questions = await getQuestionsByNoteId(request.params.noteId);
    response.json(questions);
});

app.put('/questions', async (request, response) => {
    let res = await saveQuestionToDb(request.body);
    response.json({id: res.insertId});
});

async function getQuestionFromDbById(id) {
    return executeQuery(`SELECT * FROM Questions WHERE QuestionID='${id}'`);
}

async function getQuestionsFromDb() {
    return executeQuery('SELECT * FROM Questions');
}

async function getQuestionsByNoteId(noteId) {
    return executeQuery(`SELECT * FROM Questions WHERE NoteID='${noteId}'`);
}

async function saveQuestionToDb(question) {
    return executeQuery(`INSERT INTO Questions (NoteID, Question, Answer) VALUES ('${question.noteId}', '${question.question}', '${question.answer}')`);
}


async function executeQuery(query){
    const result = await pool.query(query);
    return result[0];
}

function initDb() {
    pool = mysql.createPool({
        host: 'localhost',
        user: 'andi',
        password : "10203040",
        database: 'notesmaster_db',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
}

app.listen(3000, function () {
    initDb();
    console.log('Server running @ localhost:3000');
});
