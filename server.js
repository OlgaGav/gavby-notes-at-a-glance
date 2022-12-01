const express = require("express");
const cors = require("cors");
const path = require("path");
const logger = require("./middleware/logger");
const api = require('./routes/api');
// const { v4: uuidv4 } = require("uuid");
// const fs = require("fs");

const PORT = process.env.PORT || 3001;
// const dataFile = path.resolve(__dirname, "db", "db.json");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

// GET route for home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

//GET route for notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// GET route to index.html in case of all other requests
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/public/index.html"));
// });

app.listen(PORT, () =>
  console.log(`Application started and listen on port ${PORT}`)
);
