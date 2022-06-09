const express = require("express");

const database = require("../../firebase/firebase");
const routerHome = express.Router();
const path = require("path");
const logger = require("../../utils/logger");
const { Data } = require("../RouterUser/routerUser");
const uID = Data;


routerHome.get('/',async(req,res)=>{

    if(uID.id !== ''){
        await database.collection('Users').doc(uID.id).delete();
        logger.info('Sesion de '+uID.userPermission+' Cerrada - uID:'+uID.id)
        Data.id = '';
        Data.userPermission = '';}


res.render('home.ejs')

})

// routerHome.get('/chat',(req,res)=>{
//     res.render('chatPage.ejs')
// })

module.exports = routerHome;