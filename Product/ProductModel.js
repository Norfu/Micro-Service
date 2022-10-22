const mongoose = require("mongoose");

mongoose.model("Product",{
    name : {
        type: String,
        require : true,
        
    },
    society:{
        type: String,
        require : true,
        
        
    },
    price : {
        type:Number,
        require : true
    }
})