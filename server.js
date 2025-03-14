require('dotenv').config(); 
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const GITHUB_API = 'https://api.github.com';
const TOKEN = process.env.GITHUB_TOKEN;

app.use(express.json()); 


app.get('/github/user', async (req, res) => {
    try {
        const response = await axios.get(`${GITHUB_API}/user`, {
            headers: { Authorization: `token ${TOKEN}` }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get('/github/repos', async (req, res) => {
    try {
        const response = await axios.get(`${GITHUB_API}/user/repos`, {
            headers: { Authorization: `token ${TOKEN}` }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/github/create-repo', async (req, res) => {
    try {
        const { name, description, privateRepo } = req.body;
        const response = await axios.post(`${GITHUB_API}/user/repos`,
            { name, description, private: privateRepo },
            { headers: { Authorization: `token ${TOKEN}` } }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`MCP GitHub Server running on http://localhost:${PORT}`);
});
