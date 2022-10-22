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

app.post("/register",(req,res,next) => {
    var newUser = {
        email: req.body.email,
        password:req.body.password,        
        sold : req.body.sold,
        adress : req.body.adress
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
            next(err);
        }
    }
    
)})

//recuperer la liste des users
app.get("/users", (req,res)=>{
    User.find().then((users)=>{
        res.json(users)
    }).catch(err => {
        if(err){
            throw err;
        }
    })
})


//recuperer un seul user
app.get("/user/:id",(req,res,next)=>{
    User.findById(req.params.id).then((user)=>{
        if(user){
            
            res.json(user)
        }else{
            res.sendStatus(404);
        }
    }).catch(err => {
        if(err){
            next("id invalid");
        }
    })
})

//Delete user

app.delete("/user/:id",(req,res) =>{
    User.findOneAndDelete(req.params.id).then(()=>{
        res.send("User removed with success !")
    }).catch( err => {
        if(err){
            throw err;
        }
    })
})
app.listen(3000, () => {
    console.log("Server running !");
})

