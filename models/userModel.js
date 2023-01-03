const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        min:3,
        max:255,
        required:true
    },

    email:{
        type:String,
        min:6,
        max:255,
        required:true
    },

    password:{
        type:String,
        min:6,
        max:1024,
        required:true
    },

    date:{
        type:String,
        default: Date.now
    }
})


module.exports = mongoose.model('User',userSchema)