// Here we will put the routes which would normally go in the server.js file

// we will first need to require express and access the router
// Router - Allows us to create a new object instead of app.use we can just link it 
const express = require('express')
const router = express.Router()


//access the houses.js file 
const Product = require('../models/houses.js')



// ROUTES - INDUCES

router.get("/", (req, res) => {
    res.send('The route really works!')
})









// export the module 
module.exports =router