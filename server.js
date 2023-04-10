const fs = require('fs')
const express = require('express')
const path = require('path')

const app = express()

const PORT = process.env.PORT || 3001

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
})

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "db/db.json"))
})

app.post('/api/notes', (req, res) => {
    let newNote = req.body
    le newNote.id = Math.floor(math.randon() * 1000 )
    let notes = JSON.parse(fs.readFile('db/db.json', 'utf-8'))
})

app.listen(PORT, () => console.log("Listening on port " + PORT))