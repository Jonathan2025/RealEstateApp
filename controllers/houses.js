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

// SEED DATA
// Created some dummy data to get the user started. 
router.get('/seed', async (req, res) => {
    const newHouse =
      [
        {
            name: 'Count Dooku',
            address: '1037 Southern Artery',
            description: 'Availiable Apartment in Faxon Commons',
            img: 'https://photos.zillowstatic.com/fp/b66c988c1d4909a594f7e61c6657cf94-cc_ft_1536.webp',
            price: 280000,
            bedrooms:2,
            bathrooms: 1,
            sqft: 848,
            homeType: 'Townhouse',
            heating: '',
            cooling: 'Central Air',
            parking: 'Spaceous parking lot',
            yearBuilt: 2008,
            appliancesIncluded: 'microwave, refridgerator',
            basement: false,
            garage: true,
            kitchen: true,
            livingRoom: true,
            diningRoom: false,
            attic: false,
            amenities: 'Shared indoor gym, pool and laundry room. Also, there is cafe on the first floor',
            notes: 'I think this townhouse is great because it is walking distance from walmart'
        }
      ]
  
    try {
      const seedItems = await Houses.create(newHouse)
      res.send(seedItems)
    } catch (err) {
      res.send(err.message)
    }
  })







// export the module 
module.exports =router