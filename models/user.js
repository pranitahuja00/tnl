const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    month:{
        type:String,
        required:true
    },
    day:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:false
    }
});

const register = new mongoose.model("Registers", userSchema);
module.exports=register;