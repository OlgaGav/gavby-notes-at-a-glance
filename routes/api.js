const express = require('express');
const notesRouter = require('./notes');
const api = express();

api.use('/notes', notesRouter);

module.exports = api;