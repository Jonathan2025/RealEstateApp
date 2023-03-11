const express = require('express')

//import bcrypt 
const bcrypt = require('bcrypt')

const router = express.Router()

// require the user model we had created 
const User = require('../models/users.js')


// REGISTER PAGE
//Register - Get route
router.get('/register', (req, res) => {
	res.render('users/register.ejs')
})


// Register - POST route 
router.post('/register', async (req, res) => {
    const salt = bcrypt.genSaltSync(10) // salt - a random sequence of characters, making password harder to crack, with complexity value of 10
    
    // basically hashSync takes a password provided in the req.body.password and generates a hash
    req.body.password = bcrypt.hashSync(req.body.password, salt)
    try {
        //user.findOne ... searches the database for a user with the provided username property in the req.body object 
        //and assigns the result to the userExists variable.
        const userExists = await User.findOne({ username: req.body.username })

        if (userExists) {
            res.send('That username is taken.')
        } else {
            const createdUser = await User.create(req.body)
            req.session.currentUser = createdUser
            res.redirect('/houses')
        }
    } catch (error) {
        console.log("We have an error" + error)
        res.render(error)
    }
})




//SIGNIN Page 
//SIGNIN - Get Route
router.get('/signin', (req, res) => {
	res.render('users/signin.ejs')
})

// Signin - POST route 
router.post('/signin', async (req, res) => {

	try {
		const foundUser = await User.findOne({ username: req.body.username })

		if(foundUser) {
            //compareSync compares the password provided in the request body to the hash stored in the foundUser object.
			const validLogin = bcrypt.compareSync(req.body.password, foundUser.password)

			if(validLogin) {
				req.session.currentUser = foundUser
				res.redirect('/houses')
			} else {
				res.send('Invalid username or password')
			}
		} else {
			res.send('Invalid username or password')
		}
	} catch (error) {
		console.log(error)
		res.render(error)
	}
})









module.exports = router