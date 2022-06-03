const express = require("express");
const database = require("../../firebase/firebase");
const routerHome = express.Router();
const path = require("path");
const logger = require('../../utils/logger')


routerHome.use(express.static(path.join(__dirname + "/public")));

routerHome.get('/home',(req,res)=>{
    res.render('home.ejs')
})



routerHome.post('/home',(req,res)=>{
    const {name,email,password,userType} = req.body;
   logger.info(name,email,password,userType)

     database.collection('Users').add({name,email,password,userType})
    if(userType === 'cliente'){
        return res.redirect('/api/productos/all')}
    else{return res.redirect('/api/productos/form')}    
})

module.exports = routerHome;