//Module
const express = require('express');
require('dotenv').config() // Pas vraiment nécessaire mais plus sécurisé
const mongoose = require("mongoose")
const cors = require('cors');
const bodyParser = require("body-parser"); //c'est un middle-ware
const { restart } = require('nodemon');
//instanciation d'express
const app = express();


//Permet de changer une chaine de string en JSON 
app.use(bodyParser.json()).use(cors());

//On recuper le model de UserModel.js
require('./ProductModel')
const Product =  mongoose.model("Product") //mongoose connais Product grace a ProductModel.js donc pas besoin de Schema
 //Nom de la collection dans mongoDB ;; collection == table en SQl
//Connection a mongoDB
mongoose.connect('mongodb+srv://qdestefanis:123test@cluster0.poet56y.mongodb.net/DBProduct?retryWrites=true&w=majority').then(() => {
    console.log("Co to the db");
}).catch((err)=>{
    console.log("not co to the db",err);
});
    

//recuperer la liste des produits
app.get("/products", (req,res)=>{
    Product.find().then((products)=>{
        res.json(products)
    }).catch(err => {
        if(err){
            throw err;
        }
    })
})

//recuperer un seul produit
app.get("/product/:id",(req,res,next)=>{
    Product.findById(req.params.id).then((product)=>{
        if(product){
            //Product Data
            res.json(product)
        }else{
            res.sendStatus(404);
        }
    }).catch(err => {
        if(err){
            next("id invalid");
        }
    })
})

//Delete product

app.delete("/product/:id",(req,res) =>{
    Product.findOneAndDelete(req.params.id).then(()=>{
        res.send("Product removed with success !")
    }).catch( err => {
        if(err){
            throw err;
        }
    })
})
//Create Product

app.post("/products/new",(req,res) => {
    var newProduct = {
        name: req.body.name,
        society: req.body.society,
        price: req.body.price
    }
    //Create a new product
    var product = new Product(newProduct)
    product.save().then(() => {
        console.log("Product Created")
        res.send("Product created")
        res.status(200).end()
    }).catch((err) =>{
        if(err){
            res.status(403);
            throw err;
        }
    }
    
)})

app.listen(7777, () => {
    console.log("Server running !");
})