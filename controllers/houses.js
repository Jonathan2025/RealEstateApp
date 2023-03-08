// Here we will put the routes which would normally go in the server.js file

// we will first need to require express and access the router
// Router - Allows us to create a new object instead of app.use we can just link it 
const express = require('express')
const router = express.Router()


//access the houses.js file 
const Houses = require('../models/houses.js')



// ROUTES - INDUCES


// with the new version of mongoose, we had to modify the routes and add some new concepts
// Promise - an object that represents the eventual completeion of an asynchronous operation and its resulting value
// when you dont want to block the main thread as you wait for a response, so you create a promise to represent the eventual completion of the operation
// Async - used to declare the route handler function as asynchromous --> since we are using the "await" keyword
// to wait for the result of Houses.find
// Asynchronous - program moves on to next task and then comes back to the previouse task once its finished
// await - pause the execution of the function until a promise is resolved


// Index Route 
router.get("/", async(req,res)=> {
    try{
        const allHouses = await Houses.find({})
        res.render('index.ejs', {houses:allHouses})
    } catch(error){
        console.log(error)
        res.send(error)
    }
})









// export the module 
module.exports =router