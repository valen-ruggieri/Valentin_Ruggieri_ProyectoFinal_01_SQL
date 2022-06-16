const express = require("express");
const routerChat = express.Router();
const path = require("path");
const ChatController = require("../../controllers/chatController");
const { userPermissionsClient } = require("../../utils/permissions");
const { Data } = require("../RouterUser/routerUser");
const chatController = new ChatController();
const userPermission = require("../../Validations/userPermission");
const uID = Data;




routerChat.use(express.static(path.join(__dirname + "/public")));
routerChat.use(express.static("views"));



//>| postChat   
routerChat.post("/chat", async(req, res) => {
  userPermission(userPermissionsClient(uID.userPermission))
  const { autor, text } = req.body;
  await chatController.addMessages({ autor, text });

  res.redirect("/chat");
});

//>|  getChat   
routerChat.get("/chat", async (req, res) => {
  userPermission(userPermissionsClient(uID.userPermission))
  await chatController.getMessages(req, res);
});

//>|  deleteChat  
routerChat.get("/chat/delete", async (req, res) => {
  userPermission(userPermissionsClient(uID.userPermission))
  await chatController.deleteMessages();
  res.redirect("/chat");
});

module.exports = routerChat;
