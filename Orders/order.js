//Module
const express = require('express');
require('dotenv').config(); // Pas vraiment nécessaire mais plus sécurisé
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); //c'est un middle-ware
const { restart } = require('nodemon');
const axios = require("axios");
//instanciation d'express
const app = express();


//Permet de changer une chaine de string en JSON 
app.use(bodyParser.json());

//On recuper le model de OrderModel.js
require('./OrderModel')
const Order =  mongoose.model("Order") //mongoose connais Order grace a OrderModel.js donc pas besoin de Schema

//Connection a mongoDB
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Co to the db");
}).catch((err)=>{
    console.log("not co to the db",err);
});
    

//Create Order

app.post("/order/new",(req,res) => {
    var newOrder = {
        UserID : req.body.UserID,
        ProductID : req.body.ProductID,
        buyDate : req.body.buyDate
    }
    //Create a new Order
    var order = new Order(newOrder)
    order.save().then(() => {
        console.log("Order Created")
        res.send("Order created")
        res.status(200).end()
    }).catch((err) =>{
        if(err){
            res.status(403);
            throw err;
        }
    }
    
)})

//recuperer la liste des commmandes
app.get("/orders", (req,res)=>{
    Order.find().then((orders)=>{
        res.json(orders)
    }).catch(err => {
        if(err){
            throw err;
        }
    })
})


//recuperer une seule commande
app.get("/order/:id",(req,res,next)=>{
    Order.findById(req.params.id).then((order)=>{
        if(order){
            axios.get("http://localhost:3000/user/" + order.UserID).then((response)=>{
                
            var orderObject = {userEmail : response.data.email, productName:''}
            axios.get("http://localhost:7777/product/"+ order.ProductID).then((response)=>{

                orderObject.productName = response.data.name
          res.json(orderObject)
                
          })
        })
        }else{
            res.send("invalid order")
        }
    }).catch(err => {
        if(err){
            next("id invalid");
        }
    })
})

//Delete puser

app.delete("/order/:id",(req,res) =>{
    Order.findOneAndDelete(req.params.id).then(()=>{
        res.send("Order removed with success !")
    }).catch( err => {
        if(err){
            throw err;
        }
    })
})



app.listen(5000, () => {
    console.log("Server running !");
})