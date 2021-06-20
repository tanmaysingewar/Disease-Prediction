const mongoose = require('mongoose')
const { Schema} = mongoose

const diseaseSchema = new Schema({
    disease_id: {
        type: String,
        trim: true,
        required: true,
        maxlength:20
    },
    disease_name: {
        type: String,
        trim: true,
        required: true,
        maxlength:20,
        unique : true
    },
    symptoms:{
        type: String,
        trim : true,
        required : true,
        maxlength : 1000
    },
    type:{
        type: String,
        trim: true,
        required: true,
        maxlength:50 
    },
    homeopathic : {
        type: String,
        trim: true,
        maxlength:50  
    },
    ayurvedic:{
        type: String,
        trim: true,
        maxlength:50 
    },
    allopathy:{
        type: String,
        trim: true,
        maxlength:50 
    }

},{
    timestamps : true
})

module.exports = mongoose.model('Disease',diseaseSchema)