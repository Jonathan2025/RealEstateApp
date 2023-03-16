// Will first need to require express and access the router
// Router - Allows us to create a new object instead of app.use we can just link it 
const express = require('express')
const router = express.Router()
const Houses = require('../models/houses.js') //access the houses.js file
const bodyParser = require('body-parser')
const multer = require('multer') //multer will allow us to upload images when we submit the form 


// Custom middleware to require authentication ON ROUTES
// For now we will leave the code for authentication commented out so we can add this feature after
// const authRequired = (req, res, next) => {
//   // we want to access the current user session 
//   if(req.session.currentUser){
//       // if the user is signed in 
//       next()
//       // next is part of express and it just says "go on to the next thing"
//   } else {
//       // if there is no user 
//       // redirect them to sign in
//       res.redirect('/users/signin')
//   }
// }

//Set up the storage configuration for Multer 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // here we set the destination to the public/images folder
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
// set up the Multer middleware
const upload = multer({ storage: storage })

// Body-parser middleware
router.use(bodyParser.urlencoded({ extended: true }))

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

// Delete Route 
router.delete('/:id', async (req, res) => {
  try {
    const deleteHouse = await Houses.findByIdAndDelete(req.params.id)
    // find the id which is in req.params
    console.log(deleteHouse)
    res.redirect('/houses')
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})


// SEED Route
// Created some dummy data to get the user started. 
router.get('/seed', async (req, res) => {
    const newHouse =
      [
        {
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

// UPDATE Route
// PUT route to update a house by id
router.put('/:id', upload.single('img'), async (req, res) => {
  try {
    // Find the house by id
    const house = await Houses.findById(req.params.id)
    
    console.log(req.body)
    console.log(req.body.livingRoom)
    // Loop through the checkbox properties and update them
    for (const key in req.body) {
      
      if (Object.prototype.hasOwnProperty.call(req.body, key)) {
        //Check if the key represents a checkbox and has it "checked"
        if (req.body[key] === "on") {
          // If so, set its value to true
          req.body[key] = true
        } else if (req.body[key] === "off") {
          // Otherwise, set its value to false
          req.body[key] = false
        }
      }
    }
    // If an image was uploaded, update the img property
  if (req.file) {
      house.img = req.file.filename
    }
    // Update the house with the new values
    await house.updateOne(req.body)
    
    await house.save()
   
    // send us back to the show page after the update is made
    res.render('show.ejs', {
      house: house
    })
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
router.post('/', upload.single('img'), async (req, res) => {
  try {
    // Loop through the checkbox properties and update them
    for (const key in req.body) {
      if (Object.prototype.hasOwnProperty.call(req.body, key)) {
        // Check if the key represents a checkbox and has it "checked"
        if (req.body[key] === "on") {
          // If so, set its value to true
          req.body[key] = true
        } else if (req.body[key] === "off") {
          // Otherwise, set its value to false
          req.body[key] = false
        }
      }
    }
    // Create the house using the updated request body
    const createdHouse = await Houses.create(req.body)
    // If an image was uploaded, update the img property for the created house
    if (req.file) {
      createdHouse.img = req.file.filename
      await createdHouse.save()
    }
    res.redirect('/houses')
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})




// Edit Route 
router.get('/:id/edit', async (req, res) => {
  try {
    const foundHouse = await Houses.findById(req.params.id)
    // find the id which is in req.params
    res.render('edit.ejs', {
      house: foundHouse
    })
  } catch (error) {
    console.log(error)
    res.send(error)
  }
})


// SHOW Route 
router.get('/:id', async (req, res) => {
    try {
        // the .exec() method is used to execute the query 
      const foundHouse = await Houses.findById(req.params.id).exec()
      console.log("Show route" + foundHouse)
      res.render('show.ejs', {
        house: foundHouse
      });
    } catch (error) {
      console.log(error)
      res.send(error)
    }
  })

// export the module 
module.exports =router
