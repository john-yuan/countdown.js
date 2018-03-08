const path = require('path');
const express = require('express');
const app = express();
const root = path.resolve(__dirname, '..');
const port = process.argv[2] || 8080;

app.use(express.static(root)).listen(port);

console.info(`Server runing at http://127.0.0.1:${port}`);