// Express Dependencies 
const express = require('express');
const app = express();


// require method override 
const methodOverride = require('method-override')


// import the houses controller, now we also need to where they will route to for houses
const housesController = require('./controllers/houses.js')

// commenting out the users controller for now, will come back to in the future
// import the users controller
// const userController = require('./controllers/users.js')

// import express sessions
const session = require('express-session')

// Require mongoose
const mongoose = require('mongoose')
const Houses = require('./models/houses.js')
require('dotenv').config();


// DATABASE CONNECTION to MongoDB when we deploy to heroku
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI // Link is from teh .env file 
mongoose.set('strictQuery', true) // only things from the schema will be sent to the database 
// also removes depracation warnings 
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: false,
})




//Sessions
//we need to be able to track what the user already done, so we will do this using cookies and session
// We are going to use cookies to identify particular users in what we call "sessions"
const SESSION_SECRET = process.env.SESSION_SECRET

// Double check the session secret
console.log(SESSION_SECRET)

// Setting up the middleware for session with our secrete
app.use(session({
    secret: SESSION_SECRET,
    resave: false, // we only want to save the session if it has been modified
    saveUninitialized: false // only save the session when its new
}))


// Mongo error/success
const db = mongoose.connection
db.on('error', (err)=> console.log(`${err.message} MongoDB NOT Running!`))
db.on('connected', ()=> console.log('mongo connected'))
db.on('disconnected', ()=> console.log('mongo disconnected'))


// MIDDLEWARE 
// gives us access to req.body
app.use(express.urlencoded({extended:true})) //turns the input into actual body 
app.use(express.json())

// Eventually - methodoverride will allow us to make DELETE and PULL requests
app.use(methodOverride('_method'))


// Serve static files from the public directory
app.use(express.static('public'))


// INDUCES - Routes (will eventually go to the controllers)
app.use('/houses', housesController)

// commenting out the users controller for now, will come back to in the future
// app.use('/users', userController)


// Port Listener
const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`server is listening on port ${PORT}`);
});