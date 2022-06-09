// const {Server: ioServer} = require("socket.io");
// const server = require(".");

// const io = new ioServer(server);



// const messages = [];

// io.on("connection", (socket) => {
//   socket.emit("messages", messages);
//   socket.on("newMessage", (message) => {
//     messages.push(message);
//     io.sockets.emit("messages", messages);
//   });

//   socket.on("deleteChat", () => {
//     messages.splice(0, messages.length);
//     io.sockets.emit("messages", messages);
//   });

//   socket.on("deleteProducts", () => {
//     productos.splice(0, productos.length);
//     io.sockets.emit("products", productos);
//   });
// });
