const app = require("./app");
const config = require("./utils/config");
const logger = require("./utils/logger");
const http = require('http')
const express = require('express')

const ioServer = require("socket.io");
const server = http.createServer(app)


server.listen(config.PORT, () => {
  logger.info(`Servidor listo en el puerto : ${config.PORT}`);
});


server.on("error", (error) => logger.error("Hubo un error en el servidor :" + error)
);


const io = ioServer(server);

app.use(express.static(__dirname + "./public"));

const messages = [];

io.on("connection", (socket) => {
  console.log('connecction io')
  socket.emit("messages", messages);
  socket.on("newMessage", (message) => {
    messages.push(message);
    io.sockets.emit("messages", messages);
  });

  socket.on("deleteChat",()=>{
    messages.splice(0,messages.length)
    io.sockets.emit("messages", messages);
  })})