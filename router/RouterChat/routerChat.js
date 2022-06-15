const express = require("express");
const routerChat = express.Router();
const path = require("path");
const ChatController = require("../../controllers/chatController");
const logger = require("../../utils/logger");
const { userPermissionsClient } = require("../../utils/permissions");
const { Data } = require("../RouterUser/routerUser");
const chatController = new ChatController();

routerChat.use(express.static(path.join(__dirname + "/public")));
routerChat.use(express.static("views"));

const uID = Data;

routerChat.get("/chat", (req, res) => {
  if (!userPermissionsClient(uID.userPermission)) {
    return res.redirect("/errorRoute");
  }
  // todo|   getMessages
  chatController.getMessages(req,res);
});

module.exports = routerChat;
