const fs = require('fs');
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;
const { notes } = require('./db/db.json');
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// middleware for static resources using "static" method
app.use(express.static('public'));











// chain listen method to start express.js
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});