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
GenerateNewNote = (body, notesArray) => {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({note}, null, 2)
    );
    return note;
}









// chain listen method to start express.js
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});