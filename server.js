// Express Dependencies 
const express = require('express');
const app = express();

// require method override 
const methodOverride = require('method-override')

// import the houses controller, now we also need to where they will route to for houses
const housesController = require('./controllers/houses.js')

// import the user controller
const usersController = require('./controllers/users.js')

// import express sessions 
const session = require('express-session')

// Require mongoose
const mongoose = require('mongoose')
const Houses = require('./models/houses.js')
require('dotenv').config();


//we're going to use cookies, to identify particular users in what we call "sessions"
const SESSION_SECRET = process.env.SESSION_SECRET
console.log("Here is the session secret")
console.log(SESSION_SECRET)

// Now we can set up our session with our secret
app.use(session({
    // we have 3 options
    secret: SESSION_SECRET, 
    // resave session - to be saved even if it was never modified, thats why we set to false 
    resave: false, 
    saveUninitialized: false // forces a session that is uninitiazed to be saved to the store

}))




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
app.use(express.json());

// Eventually - methodoverride will allow us to make DELETE and PULL requests
app.use(methodOverride('_method'))



// INDUCES - Routes (will eventually go to the controllers)
app.use('/houses', housesController)


// add the users controller 
app.use('/users', usersController)



// Port Listener
const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`server is listening on port ${PORT}`);
});