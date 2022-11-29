const express = require('express');
const path = require('path');
const {clog} = require('./middleware/clog');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

// import custom middleware, client Log(cLog)
app.use(clog);

// middleware to parse JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', api);

// GET route for home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
})

//GET rote for notes page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
})

// wildcard route redirect users to 404 page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/404.html'));
})

app.listen(PORT, () => console.log(`Application started and listen on port ${PORT}`));