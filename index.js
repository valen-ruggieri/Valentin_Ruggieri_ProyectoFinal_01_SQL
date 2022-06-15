const app = require("./app");
const logger = require("./utils/logger");
const http = require('http')
const express = require('express')
const ioServer = require("socket.io");
const ChatController = require("./controllers/chatController");
const server = http.createServer(app)
const chatController = new ChatController();
const PORT = 8080;

server.listen(PORT, () => {
  logger.info(`Servidor listo en el puerto : ${PORT}`);
});


server.on("error", (error) => logger.error("Hubo un error en el servidor :" + error)
);


const io = ioServer(server);

app.use(express.static(__dirname + "./public"));

chatController.initChaT()

const messages =[]

io.on("connection", (socket) => {
  console.log('connecction io')
  socket.emit("messages", messages);
  socket.on("newMessage", (message) => {
    console.log(messages)
    chatController.arrayMessages();
    // todo|   addMessages
    messages.push(message)
    console.log('mensaje'+message)
    chatController.addMessages(message);
    io.sockets.emit("messages", messages);
  });

  socket.on("deleteChat",()=>{
    // todo|   deleteMessages
    messages.splice(0,messages.length)
    chatController.deleteMessages()
    io.sockets.emit("messages", messages);
  })})