const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json')

const exp = express();

const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

exp.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});
  
exp.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});
  
exp.get('/api/notes', (req, res) => {
    res.json(db);
});

exp.post('/api/notes', (req, res) => {
    if (req.body)
    console.info(`$`)
});




exp.listen(PORT, () => console.log(`http://localhost:${PORT}`));