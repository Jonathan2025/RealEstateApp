// Express Dependencies 
const express = require('express');
const app = express();

// require method override 
const methodOverride = require('method-override')

// import the houses controller, now we also need to where they will route to for houses
const housesController = require('./controllers/houses.js')


// Require mongoose
const mongoose = require('mongoose')
const Houses = require('./models/houses.js')
require('dotenv').config();


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


// Port Listener
const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`server is listening on port ${PORT}`);
});