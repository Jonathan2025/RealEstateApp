// schema is actually a blueprint for data pretty much 
// the houses schema
const mongoose = require('mongoose');

const housesSchema = new mongoose.Schema({
    address: {type:String, required:true},
    city: {type:String, required:true},
    state: {type:String, required:true},
    zip: {type:String, required:true},
    description: String,
    img: {type:String},
    price: {type:Number,required:true, min:0},
    bedrooms: {type:Number, min:0},
    bathrooms: {type:Number, min:0},
    sqft: {type:Number, min:0},
    homeType: {type:String},
    heating: {type:String},
    cooling: {type:String},
    parking: {type:String},
    yearBuilt: {type:Number,min:0},
    appliancesIncluded: {type:String},
    basement: {type:Boolean},
    garage: {type:Boolean},
    kitchen: {type:Boolean},
    livingRoom: {type:Boolean},
    diningRoom: {type:Boolean},
    attic: {type:Boolean},
    amenities: {type:String},
    notes:{type:String}, 

});

const Houses = mongoose.model('Houses', housesSchema);
module.exports = Houses;