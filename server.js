const fs = require('fs')
const express = require('express')
const {v4 : uuidv4} = require('uuid')
const path = require('path')
const noteList = require('./db/db.json')
const app = express()
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3001

app.use(bodyParser.json({ extended: false}))

//middleware for public
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


//route to notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
})

//route gets notes from db.json
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err) => {if (err) console.log(err)})
    res.json(noteList)
})

//route post new note
app.post('/api/notes', (req, res) => {
    noteList.push(req.body)
    fs.writeFile("./db/db.json", JSON.stringify(noteList), err => { if (err) console.log(err)})
})

// delete note
app.delete("api/notes/:id", function (req, res) {
    if (req.params.id) {
        const noteId = req.params.id;
        for (let i = 0; i < noteList.length; i ++) {
            if (noteList[i].id === noteId) {
                noteList.splice(i, 1)
            }
        }
    }
    fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {console.log(err)})
    res.json(`Deleted note ${req.params.id}`)
})

app.listen(PORT, () => console.log("Listening on port " + PORT))