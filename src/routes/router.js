const express = require('express');
const app = express.Router();
const control = require('../controller/control');

app.get('/searchCases', control.obtemCasosCovid);
app.get("/users?name=anas", (req, res) => { // https://domain.com/users?name=anas
    const name = req.query.name; //anas
    console.log(name)
})

app.post('/testando', (req, res) => {
    console.log(req)
})

module.exports = app;
