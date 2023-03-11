const express = require('express')

//import bcrypt 
const bcrypt = require('bcrypt')

const router = express.Router()

// require the user model we had created 
const User = require('../models/users.js')


// REGISTER
// create a register route
router.get('/register', (req, res) => {
	res.render('users/register.ejs')
})


router.post('/register', async (req, res) => {
    const salt = bcrypt.genSaltSync(10)
    req.body.password = bcrypt.hashSync(req.body.password, salt)

    try {
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






module.exports = router