const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Serve index.html for all routes (SPA fallback)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`🍌 Banana App is running at http://0.0.0.0:${port}`);
  console.log(`📱 Open your browser and visit the URL above!`);
});