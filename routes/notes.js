const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
// const {
//   readFromFile,
//   readAndAppend,
//   writeToFile
// } = require ('./../helper/fsUtils');
const { readFromFile, writeToFile, readAndAppend} = require('./../helper/fsUtils');

// notes.get('/', (req, res) => {
//   readFromFile('./db/db.json')
//   .then((data) => {
//     res.json(JSON.parse(data));
//   })
// });

notes.get('/', (req, res, next) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
    console.log("called get / from notes.js");
});
notes.get('/notes', (req, res, next) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  console.log("called get /notes from notes.js");
});
notes.get('/api/notes', (req, res, next) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  console.log("called get /api/notes from notes.js")
});


// POST Route for a new note
notes.post('/api/notes', (req, res) => {
  console.log(req.body);

  const { title, text} = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
    // res.json(`Note added successfully 🚀`);
  } else {
    res.json('Error in posting note');
  }
});

module.exports = notes;