//Module
const express = require('express');
require('dotenv').config() // Pas vraiment nécessaire mais plus sécurisé
const mongoose = require("mongoose")
const bodyParser = require("body-parser"); //c'est un middle-ware
const { restart } = require('nodemon');
//instanciation d'express
const app = express();


//Permet de changer une chaine de string en JSON 
app.use(bodyParser.json());

//On recuper le model de OrderModel.js
require('./OrderModel')
const Order =  mongoose.model("Order") //mongoose connais Order grace a OrderModel.js donc pas besoin de Schema
 //Nom de la collection dans mongoDB ;; collection == table en SQl
//Connection a mongoDB
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Co to the db");
}).catch((err)=>{
    console.log("not co to the db",err);
});
    


//Create Order



app.listen(3000, () => {
    console.log("Server running !");
})