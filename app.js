const express = require('express');
const morgan = require('morgan');
const itemsRoute = require('./routes/items')
const app = express();

app.use(morgan('dev'));

app.get('/', (req, res, next)=>{
    return res.json("Welcome to Express Shopping List Exercise")
})

app.use('/items', itemsRoute)

module.exports = app;