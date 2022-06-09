const express = require("express");
const routerChat = express.Router();
const path = require("path");
const logger = require("../../utils/logger");
const { userPermissionsClient } = require("../../utils/permissions");
const { Data } = require("../RouterUser/routerUser");

routerChat.use(express.static(path.join(__dirname + '/public')))

const uID = Data;

routerChat.get('/chat',(req,res)=>{
  if (!userPermissionsClient(uID.userPermission)){return res.redirect('/errorRoute') }

    res.render('chatPage.ejs')
  })

  module.exports= routerChat;