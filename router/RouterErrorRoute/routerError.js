const express = require("express");
const routerError = express.Router();
const path = require("path");
const logger = require("../../utils/logger");

routerError.use(express.static(path.join(__dirname + '/public')))


routerError.get('/errorRoute',(req,res)=>{
    res.render('errorRoute.ejs')
})

module.exports = routerError;