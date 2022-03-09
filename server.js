//////////////////////////////
//import our depedencies
/////////////////////////////
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
// we'll also import our fruits model when we have it


//////////////////////
// create our express application
//////////////////////
const app = require('liquid-express-views')(express())

////////////
//middleware
///////////
app.use(morgan('tiny'))
app.use(methodOverride('method'))
//parses urlencoded 
app.use(express.urlencoded({ extended :false }))
// to serve files from public
app.use(express.static('public'))

/////////
//routes
///////
app.get('/', (req,res) => {
    res.send('your server is running')
})

///////////////////////
//server listener
/////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('app is listening on port: ${PORT}')
})