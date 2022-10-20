// Dependencies
const fs = require('fs');
const path = require('path');
const express = require('express');
const { notes } = require('./db/db.json');
// Server setup
const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// middleware for static resources using "static" method
app.use(express.static('public'));

// function for creating new notes
GenerateNewNote = (body, noteArray) => {
    const newNote = body;
    noteArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({notes: noteArray}, null, 2)
    );
    return newNote;
};

// function for deleting existing notes
deleteExistingNote = (noteArray, id) => {
    for (let i = 0; i < noteArray.length; i++) {
        let noteDelete = noteArray[i];
        if (noteDelete.id == id) {
            noteArray.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, './db/db.json'),
                JSON.stringify(noteArray, null, 2)
        )}
    }   
};

// API routes
app.get("/api/notes", (req, res) => {
    res.json(notes);
});

app.post("/api/notes", (req, res) => {
    req.body.id = notes.length.toString();
    let note = GenerateNewNote(req.body, notes);
    res.json(note);
})

// API route for delete function
app.delete("/api/notes/:id", (req, res) => {
    deleteExistingNote(notes, req.params.id);
    res.json(notes);
})

// html routes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});



// chain listen method to start express.js
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});