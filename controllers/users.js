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
      res.redirect('/houses')
    } catch (error) {
      console.log(error)
      res.render(error)
    }
  })

module.exports = router