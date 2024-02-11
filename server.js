const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static('public'));

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle saving data to a text file
app.post('/save', (req, res) => {
  const data = req.body.text;

  if (!data) {
    return res.status(400).send('No data provided');
  }

  fs.appendFile(path.join(__dirname, 'test.txt'), data + '\n', (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error saving data');
    }
    res.send('Data saved successfully');
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
