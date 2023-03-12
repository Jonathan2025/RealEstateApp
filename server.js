// Express Dependencies 
const express = require('express');
const app = express();

// require method override 
const methodOverride = require('method-override')
require('dotenv').config();
const Houses = require('./models/houses.js')

// import the houses controller, now we also need to where they will route to for houses
const housesController = require('./controllers/houses.js')

// import the users controller 
const userController = require('./controllers/users.js')


// import express sessions
const session = require('express-session')


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

// this middleware will attach a cookie to our response  which will then get saved by the user's browser


// Require mongoose
const mongoose = require('mongoose')


// Establish a Connection to MongoDB
mongoose.connect(process.env.DATABASE_URL, {
    // remove the depracation warnings
    useNewUrlParser: true,
    useUnifiedTopology: true,

})


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

// INDUCES - Routes (will eventually go to the controllers)
app.use('/houses', housesController)

app.use('/users', userController)



// Port Listener
const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`server is listening on port ${PORT}`);
});