const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

app.post('/save', (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }

    fs.appendFile('saved.txt', text + '\n', (err) => {
        if (err) {
            console.error('Error saving text:', err);
            return res.status(500).json({ error: 'Error saving text' });
        }
        res.status(200).json({ message: 'Text saved successfully' });
    });
});

module.exports = app;
