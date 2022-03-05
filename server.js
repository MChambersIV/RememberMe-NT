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
   
    req.body.id = (Math.floor(Math.random() * 50000));
   
    db.push(req.body);


 

    fs.writeFile('./db/db.json', JSON.stringify(db, null, 4), (writeErr) =>
                writeErr
                ? console.error(writeErr)
                : console.info('Successfully added new Note'));

    console.log("New note created.")
});



exp.listen(process.env.PORT || PORT, () => console.log(`http://localhost:${PORT}`));