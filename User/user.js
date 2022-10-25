//Module
const express = require('express');
const cors = require('cors')
const mongoose = require("mongoose")
const bodyParser = require("body-parser"); //c'est un middle-ware
const { restart } = require('nodemon');
//instanciation d'express
const app = express();


//Permet de changer une chaine de string en JSON 
app.use(bodyParser.json()).use(cors());

//On recuper le model de UserModel.js
require('./UserModel')
const User =  mongoose.model("User") //mongoose connais User grace a UserModel.js donc pas besoin de Schema
 //Nom de la collection dans mongoDB ;; collection == table en SQl
//Connection a mongoDB
mongoose.connect('mongodb+srv://qdestefanis:123test@cluster0.poet56y.mongodb.net/DBUser?retryWrites=true&w=majority').then(() => {
    console.log("Co to the db");
}).catch((err)=>{
    console.log("not co to the db",err);
});
    


//Create User

app.post("/register",(req,res,next) => {
    var newUser = {
        email: req.body.email,
        password:req.body.password,        
        sold : 500,
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
            res.status(400);
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
    User.findByIdAndDelete(req.params.id).then(()=>{
        res.send("User removed with success !")
    }).catch( err => {
        if(err){
            throw err;
        }
    })
})

//modifier sold de l'utilisateur (n'est pas au point)
app.put("/user/:id/sold",(req,res) => {
    User.findByIdAndUpdate(req.params.id,{sold : req.body.sold},{new : true},(err,doc)=>{
        if(err){
            console.log("sold not updated")
            res.sendStatus(400).send(err)
        }else{
            console.log("sold updated back end")
            res.sendStatus(200)
        }
        console.log(doc);

    })})
        //     return res.status(404).send('User not found')
        // }else{ 
        // const userUpdate ={            
        //     sold : req.body.sold            
        // }
        // user = Object.assign(user,userUpdate)
        // user.save().then(() =>{
        //     console.log("user sold updated")
        //     res.status(200);
        // }).catch(err =>{
        //     console.log(err)
        //     res.status(400)
        //     next(err);
        // })


        
    

//Pour simuler une authentification
app.post("/auth",(req,res)=>{
   User.findOne({email:req.body.email , password: req.body.password},(err,doc) =>{
        if(err){
            res.sendStatus(400);
            res.send(err);
            console.log(err);
        }else{
            
            res.json(doc);
            console.log(doc)
        }
   });
})
app.listen(3000, () => {
    console.log("Server running !");
})

