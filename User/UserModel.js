const mongoose = require("mongoose");
const validator = require("validator")

mongoose.model("User",{
    email : {
        type: String,
        require : true,
        validate(v){
            if(!validator.isEmail(v)) throw new Error('Email non valide')
        }
    },
    password:{
        type: String,
        require : true,
        validate(v){
            if(!validator.isLength(v, {min : 4, max : 20})) throw new Error('Le mot de passe doit contenir entre 4 et 20 caractères')
        }
        
    },
    adress : {
        type:String,
        require : true
    },
    sold : {
        type:Number,
        require : false
    }
})