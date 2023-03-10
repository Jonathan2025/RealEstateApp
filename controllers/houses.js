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


// New Route
router.get("/new", async(req,res) => {
  res.render('new.ejs')
})






// SEED Route
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
    } catch (error) {
      res.send(error.message)
    }
  })


// Update Route 
//lets make out route actually update the product after we submit the edit form
router.put('/:id', async (req, res) => {
  try {
      // Loop through the checkbox properties and update them
      // similar to what we had in the create route in which we used the code we had in that route
      for (const key in req.body){

        if (req.body.hasOwnProperty(key)) {

          // Check if the key represents a checkbox and has it "checked"
          if (req.body[key] === "on") {
            // If so, set its value to true
            req.body[key] = true
            // if its not checked, then set its value to false 
          } else if (req.body[key] === "off") {
            // Otherwise, set its value to false
            req.body[key] = false
          }
        }
      }

      // Find and update the house by id using async/await
      const updatedHouse = await Houses.findByIdAndUpdate(req.params.id, req.body, {new: true})

      console.log(updatedHouse);
      res.redirect('/houses');
  } catch (error) {
      console.log(error)
      res.send(error)
  }
})




















// concept of the create route
// when we submit a form with checkboxes, the values of the checkboxes are sent to the server as an object in the "req.body" variable
// We want to convert the "on" value to "true" and the "undefined" to false (meaning it was unchecked)
// To do this, we need to check if each property represents a checkbox 
// Each checkbox represents a key value pair in the req.body object


// Create Route 
router.post('/', async (req, res) => {
  try {
    // because we have multiple fields that have check boxes we need to loop through them
    for (const key in req.body) {
      //console.log("first console.log" + key) //address
      // hasownporperty is a method to check if the key is a direct property with a specific name
      if (req.body.hasOwnProperty(key)) {
        //console.log("second console.log" + key) // address

       
        //console.log("third console.log" + req.body[key]) // 123 sesame street
        // pretty much req.body[key] is using brackett notation to access the properties of the object 
        // Ex. req.body['address'], req.body['description'], etc

         // Check if the key represents a checkbox and has it "checked"
        if (req.body[key] === "on") {
          // If so, set its value to true
          req.body[key] = true
          // if its not checked, then set its value to false 
        } else if (req.body[key] === "off") {
          // Otherwise, set its value to false
          req.body[key] = false
        }
      }
    }

    // Create the house using the updated request body
    const createdHouse = await Houses.create(req.body)
    res.redirect('/houses')
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})





// Edit Route 
router.get('/:id/edit', async (req, res) => {
  try {
    const foundHouse = await Houses.findById(req.params.id);
    // find the id which is in req.params
    res.render('edit.ejs', {
      house: foundHouse
    });
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})








// SHOW Route 
router.get('/:id', async (req, res) => {
    try {
        // the .exec() method is used to execute the query 
      const foundHouse = await Houses.findById(req.params.id).exec();
      res.render('show.ejs', {
        house: foundHouse
      });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  });








// export the module 
module.exports =router