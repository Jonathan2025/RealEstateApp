// import bcrypt package
const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const User = require('../models/users.js')


// REGISTER 
// Register - Get Route
// Be mindful of the route in the server.js --> our user controller
router.get('/register', (req, res) => {
	res.render('users/register.ejs')
})

// Register - Post route 
router.post('/register', async (req, res) => {
    try {
        // The salt is a random string of characters that is used as additional input to the hash function, 
        //making it more difficult to crack the hash, 10 represents the rounds of hashing
      const salt = await bcrypt.genSalt(10) 
      // use the hash function provided by bcrypt to generate a hash of the password provided in the req.body.password field. 
      const hashedPassword = await bcrypt.hash(req.body.password, salt)
      req.body.password = hashedPassword
  
      const existingUser = await User.findOne({ username: req.body.username })
  
      if (existingUser) {
        return res.send('That username is taken')
      }
  
      const newUser = await User.create(req.body)
      req.session.currentUser = newUser
      res.redirect('/users/signin')
    } catch (error) {
      console.log(error)
      res.render(error)
    }
  })

// SIGNIN PAGE
// Signin - get route
router.get('/signin', (req, res) => {
	res.render('users/signin.ejs')
})


// Signin - POST route 
router.post('/signin', async (req, res) => {
    try {
      // we need to get the user with that username
      const foundUser = await User.findOne({ username: req.body.username })
  
      if (foundUser) {
        // if the user does exist we need to compare their passwords using bcrypt's compare function
        const validLogin = await bcrypt.compare(req.body.password, foundUser.password)
  
        //validLogin will be true if the passwords match
        if (validLogin) {
          // saving the current user session as the found user
          req.session.currentUser = foundUser

          res.redirect('/houses')
        } else {
          res.send('Invalid username or password')
        }
      } else {
        // if the user does not exist, we need to let user know
        res.send("The username and password could not be found, please register an account")
      }
    } catch (error) {
      console.log(error)
      res.render(error)
    }
  })

router.get('/signout', (req,res)=>{
    // this destroys this session (logs the user out)
    // you can always access the user IF signed in in this request object 
    req.session.destroy()
    // once signed out redirect the user to the signin page
    res.redirect('/users/signin')
})




module.exports = router