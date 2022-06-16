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

routerChat.post("/chat", (req, res) => {
  if (!userPermissionsClient(uID.userPermission)) {
    return res.redirect("/errorRoute");
  }
  const { autor, text } = req.body;
  chatController.addMessages({ autor, text });

  res.redirect("/chat");
});
routerChat.get("/chat", async (req, res) => {
  if (!userPermissionsClient(uID.userPermission)) {
    return res.redirect("/errorRoute");
  }
  await chatController.getMessages(req, res);
});
routerChat.get("/chat/delete", async (req, res) => {
  if (!userPermissionsClient(uID.userPermission)) {
    return res.redirect("/errorRoute");
  }
  await chatController.deleteMessages();
  res.redirect("/chat");
});
module.exports = routerChat;
