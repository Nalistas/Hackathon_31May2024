const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = 3000;

const OpenAIService = {
    getGPT3Response: async (userPrompt) => {
        const systemInstructions = "";
        const prompt = `${systemInstructions}\n${userPrompt}`;

        const response = await axios.post('https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions', {
            prompt: prompt,
            max_tokens: 100,
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_PROJECT_API_KEY}`
            }
        });
        return response.data.choices[0].text;
    }
};

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
