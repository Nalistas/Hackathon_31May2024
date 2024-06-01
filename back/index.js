const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();
const app = express();
const port = 5000;

const OpenAI = require('openai');
const openai = new OpenAI();

let discussions = {};

app.use(cors())
app.use(bodyParser.json());


app.get("/api/data", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.post("/api/data", async (req, res) => {
    const message = req.body.message;
    const title = req.body.title;

    console.log(discussions[title]);
    if (discussions[title] === undefined) {
        discussions[title] = [{"role": "system", "content": "Theo, an IA that teachs really well programmation language"}];
    }

    discussions[title].push({"role": "user", "content": message});

    try {
        const responseText = await openai.chat.completions.create({ messages: discussions[title], model: "gpt-4o"});
        discussions[title].push({"role": "assistant", "content": responseText.choices[0].message.content});
        res.json({ text: responseText.choices[0].message.content });
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).send('Une erreur est survenue');
    }
});

app.use(express.json());

app.post('/api/generate', async (req, res) => {
    const { prompt } = req.body;

    try {
        const responseText = await OpenAIService.getGPT3Response(prompt);
        res.json({ text: responseText });
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).send('Une erreur est survenue');
    }
});

app.listen(port, () => {
    console.log(`Serveur en écoute sur http://localhost:${port}`);
});
