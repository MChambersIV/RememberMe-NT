const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json');

const exp = express();

const PORT = 3001;

exp.use(express.json());
exp.use(express.urlencoded({ extended: true }));

exp.use(express.static('public'));

exp.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});
  
exp.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});
  
exp.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received`);
    
   return res.json(db);

});

exp.post('/api/notes', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
    const newNoteSave = {
        title,
        text,
     };

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          const existingNotes = JSON.parse(data);
  
          existingNotes.push(newNoteSave);

            fs.writeFile(
                './db/db.json',
                JSON.stringify(existingNotes, null, 4),
                (writeErr) =>
                writeErr
                ? console.error(writeErr)
                : console.info('Successfully added new Note')

            );
        }
    });
    const response = {
        status: 'success',
        body: newNoteSave,
    }
    res.json(response);
    } else {
        res.json('Error attempting to add note')
    }

    
});




exp.listen(process.env.PORT || PORT, () => console.log(`http://localhost:${PORT}`));