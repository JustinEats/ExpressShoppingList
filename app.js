const express = require('express');
const morgan = require('morgan');
const itemsRoute = require('./routes/items')
const expressError = require('./expressError')
const app = express();

app.use(morgan('dev'));
app.use(express.json())


//ROUTES 
app.get('/', (req, res, next)=>{
    return res.json("Welcome to Express Shopping List Exercise")
})

app.use('/items', itemsRoute)


//ERROR HANDLING
app.use((req, res, next)=>{
    const e = new expressError("Page Not Found", 404)
    return next(e)
})

app.use((error, req, res, next) =>{
    let message = error.message || 500
    let status = error.status
    return res.status(status).json({error: {message, status}})
})

module.exports = app;