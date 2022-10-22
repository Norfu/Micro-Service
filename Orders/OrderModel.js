const mongoose = require("mongoose");

mongoose.model("Order",{
    
    buyDate:{
        type: Date,
        require : true,       
        
    }
})