const mongoose = require("mongoose");

mongoose.model("Order",{
    
    UserID:{
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    ProductID :{
        type: mongoose.SchemaTypes.ObjectId,
        require: true
    },
    buyDate:{
        type: Date,
        require : true,       
        
    }
})