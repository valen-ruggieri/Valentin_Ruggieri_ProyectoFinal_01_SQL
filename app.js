const express = require("express");
const app = express();
const path = require("path");
const routerCarrito = require("./router/RouterCarrito/routerCarrito");
const routerError = require("./router/RouterError/routerError");
const routerHome = require("./router/RouterHome/routerHome");
const routerProducts = require("./router/RouterProductos/routerProductos");
const { routerUser } = require("./router/RouterUser/routerUser");

app.use(express.static(path.join(__dirname + "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("views", path.join(__dirname, "/public/views"));
app.set("view engine", "ejs");
app.use("/api", routerUser);
app.use("/api", routerProducts);
app.use("/api", routerCarrito);
app.use("/",routerHome)
app.use('/',routerError)

module.exports = app;
