const express = require('express');
const cors = require('cors');
const path = require('path');
const logger =require('./middleware/logger');
// const api = require('./routes/index.js');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const PORT = process.env.PORT || 3001;
const dataFile = path.resolve(__dirname, "db", "db.json");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(logger);
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

// GET route for home page
app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, 'public/index.html'));
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

//GET rote for notes page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.get('/api/notes', (req, res) => {
  const existingNotesString = fs.readFileSync(dataFile, "utf8");
  const existingNotes = JSON.parse(existingNotesString);
  
  res.json(existingNotes);
  res.end();
})

app.post('/api/notes', (req, res) => {
  const { text, title } = req.body;

  const existingNotesString = fs.readFileSync(dataFile, "utf8");
  const existingNotes = JSON.parse(existingNotesString);
  console.log(existingNotes);

  existingNotes.push({
    title,
    text,
    note_id: uuidv4(),
  })

  fs.writeFileSync(dataFile, JSON.stringify(existingNotes, null, 4));
  res.end();
})

app.listen(PORT, () => console.log(`Application started and listen on port ${PORT}`))