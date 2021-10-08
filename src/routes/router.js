const express = require('express');
const app = express.Router();
const control = require('../controller/control');

app.get('/searchCases', control.obtemCasosCovid);

module.exports = app;
