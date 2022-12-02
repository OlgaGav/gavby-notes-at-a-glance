const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

const dataFile = path.resolve(__dirname, "..", "db", "db.json");

// GET all notes
notes.get("/", (req, res) => {
  const existingNotesString = fs.readFileSync(dataFile, "utf8");
  const existingNotes = JSON.parse(existingNotesString);
  res.json(existingNotes);
});

// POST to create new note
notes.post("/", (req, res) => {
  const { text, title } = req.body;
  const existingNotesString = fs.readFileSync(dataFile, "utf8");
  const existingNotes = JSON.parse(existingNotesString);

  existingNotes.push({
    title,
    text,
    id: uuidv4(),
  });

  const updatedNotes = JSON.stringify(existingNotes, null, 4);

  fs.writeFileSync(dataFile, updatedNotes);
  res.end();
});

// GET route for a specific note
notes.get("/:id", (req, res) => {
  const noteId = req.params.id;
  const existingNotesString = fs.readFileSync(dataFile, "utf8");
  const existingNotes = JSON.parse(existingNotesString);
  const found = existingNotes.find((note) => note.id === noteId);
  if (found) {
    res.json(found);
  } else {
    res.status(400).send("No note with requested ID found");
  }
});

// DELETE route for a specific note
notes.delete("/:id", (req, res) => {
  const noteId = req.params.id;
  const existingNotesString = fs.readFileSync(dataFile, "utf8");
  const existingNotes = JSON.parse(existingNotesString);

  let result = existingNotes.filter((note) => note.id !== noteId);

  fs.writeFileSync(dataFile, JSON.stringify(result, null, 4));
  res.json(`Note has been deleted`);
});

module.exports = notes;
