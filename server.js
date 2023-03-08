// Express Dependencies 
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const House = require('./models/houses.js')
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



// INDUCES - Routes (will eventually go to the controllers)



// Port Listener
const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`server is listening on port ${PORT}`);
});