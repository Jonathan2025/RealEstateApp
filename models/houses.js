// schema is actually a blueprint for data pretty much 
// the houses schema
const mongoose = require('mongoose');

const housesSchema = new mongoose.Schema({
    address: {type:String, required:true},
    description: String,
    img: {type:String, required:true},
    price: {type:Number,required:true, min:0},
    bedrooms: {type:Number,required:true, min:0},
    bathrooms: {type:Number,required:true, min:0},
    sqft: {type:Number,required:true, min:0},
    homeType: {type:String,required:true},
    heating: {type:String},
    cooling: {type:String},
    parking: {type:String},
    yearBuilt: {type:Number},
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