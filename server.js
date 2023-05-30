//require express
const express = require('express');
const bodyParser = require('body-parser');
const noteList = require('./db/db.json');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

//set port
const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json({ extended: false }));

//middleware for public
app.use(express.static('public'));

//route user to notes.html
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.post('/api/notes', (req, res) => {
    noteList.push(req.body);
    console.log(crypto.randomUUID())
    fs.writeFile('./db/db.json', JSON.stringify(noteList), err => { if (err) console.log(err) });
})

// get notes
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err) => { if (err) console.log(err) });
    res.json(noteList);
});

app.get('/api/notes/:id', function (req, res) {
    if (req.params.id) {
        const noteId = req.params.id;
        for (let i = 0; i < noteList.length; i++) {
            const currentNote = noteList[i];
            if (noteList[i].id === noteId) {
                res.json(currentNote);
                return;
            }
        }
    }
});
// delete notes
app.delete('/api/notes/:id', function (req, res) {
    if (req.params.id) {
        const noteId = req.params.id;
        for (let i = 0; i < noteList.length; i++) {
            if (noteList[i].id === noteId) {
                console.log(noteList[i])
                noteList.splice(i, 1)
            }
        }
    }
    // update the db
    fs.writeFile('./db/db.json', JSON.stringify(noteList), (err) => { console.log(err) });
    res.json(`Deleted note ${req.params.id}`);
})
// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);