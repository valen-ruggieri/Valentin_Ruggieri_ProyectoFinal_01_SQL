const app = require("./app");
const logger = require("./utils/logger");
const http = require('http')
const express = require('express')
const ChatController = require("./controllers/chatController");
const server = http.createServer(app)
const chatController = new ChatController();
const PORT = 8080;

server.listen(PORT, () => {
  logger.info(`Servidor listo en el puerto : ${PORT}`);
});


server.on("error", (error) => logger.error("Hubo un error en el servidor :" + error)
);


