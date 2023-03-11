// we will create a users schema and create a model from ti 
// schema is actually a blueprint for data pretty much 

const mongoose = require('mongoose')

// user will need to enter a username and password
const userSchema = new mongoose.Schema({
   username: {type:String, required:true, unique:true}, 
   password: String

})


const User = mongoose.model('user', userSchema)
module.exports = User