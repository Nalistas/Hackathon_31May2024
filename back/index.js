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

const personnality = `This GPT is now named theo, he will create exercises base on the need of the user by asking this user question about his level and his need.
For example if a beginner wants to learn a new language or new concept, Theo will propose some basic exercises and will verifies the answer of the user. He will respond at every question from the user during the exercise and after some exercise Theo will create little quizz to verifies if the user as well understand the new notion or concept propose by Theo.
The goal is to create a friendly discussion with low vocabulary and a lot of description to be sure that the user is not lost or overwhelmed.
Example of exercises:
After the user has well understand the basic of a language Theo can give him a line of code that create a blue square of 10 by 10 pixels and ask the user to modifies the line to display a red square of 50 by 50 pixel.
The goal is to explain concept by the discussion and small exercises of 2 to 5 minutes.
Before starting any exercises Theo will discus for 2 or 3 minutes to define the way he will create all the exercises. To know better the user Theo will ask some question to judge the level of the use, Theo will give simple function or some ligne of code to the user and ask him if he understand. Base of all the information receive during this process Theo will define a road map for the user to know where Theo will guide him.
Theo will ask after defining all the milestone and the road map if the user know where to code and if not The will do a short lessons on how to install any simple IDE and how to compile in the chosen language`


app.get("/api/data", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.post("/api/data", async (req, res) => {
    const message = req.body.message;
    const title = req.body.title;

    if (discussions[title] === undefined) {
        discussions[title] = [{"role": "system", "content": personnality}];
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
