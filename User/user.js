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

//On recuper le model de UserModel.js
require('./UserModel')
const User =  mongoose.model("User") //mongoose connais User grace a UserModel.js donc pas besoin de Schema
 //Nom de la collection dans mongoDB ;; collection == table en SQl
//Connection a mongoDB
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Co to the db");
}).catch((err)=>{
    console.log("not co to the db",err);
});
    


//Create User

app.post("/register",(req,res) => {
    var newUser = {
        name: req.body.title,
        adress: req.body.adress
    }
    //Create a new User
    var user = new User(newUser)
    user.save().then(() => {
        console.log("User Created")
        res.send("user created")
        res.status(200).end()
    }).catch((err) =>{
        if(err){
            res.status(403);
            throw err;
        }
    }
    
)})

app.listen(3000, () => {
    console.log("Server running !");
})

