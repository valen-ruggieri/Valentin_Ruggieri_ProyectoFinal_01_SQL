const express = require("express");
const app = express();
const path = require("path");
const routerHome = require('./router/RouterHome/routerHome')
const routerProducts = require("./router/RouterProductos/routerProductos");
const routerCarrito = require("./router/RouterCarrito/routerCarrito");

app.use(express.static(path.join(__dirname + "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("views", path.join(__dirname, "/public/views"));
app.set("view engine", "ejs");
app.use('/api' , routerHome);
app.use("/api", routerProducts);
app.use("/api", routerCarrito);

module.exports = app;
