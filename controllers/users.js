const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const User = require('../models/users.js')

router.get('/register', (req, res) => {
	res.render('users/register.ejs')
})



module.exports = router