const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
let OpenAI = require('openai');

const openai = new OpenAI({
});

const app = express();
app.use(cors());

app.get('/', async (request, response) => {
    let content = await main(request.query.text);
    response.send(content);
});

async function main(userText) {
    const completion = await openai.chat.completions.create({
        messages: [
            { role: "user", content: `Generate in a json style a short title, some questions and the correct answer for each question for the following text: ${userText}` }
        ],
        model: "gpt-3.5-turbo",
    });

    return completion.choices[0].message.content;
}

app.listen(2000, () => {
    console.log('Server running on http://localhost:2000');
});