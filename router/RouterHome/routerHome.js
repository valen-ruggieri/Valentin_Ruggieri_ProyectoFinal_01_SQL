const express = require("express");

const database = require("../../firebase/firebase");
const routerHome = express.Router();
const path = require("path");
const logger = require("../../utils/logger");
const userSession = require("../../utils/auth");

routerHome.use(express.static(path.join(__dirname + "/public")));

routerHome.get("/home", (req, res) => {
  res.render("home.ejs");
});

routerHome.post("/home", async (req, res) => {
  const { name, email, password, userType } = req.body;
  const carrito = [];

  await database
    .collection("Users")
    .add({ name, email, password, userType, carrito });
userSession(email,password)
  if (userType === "cliente") {
    return res.redirect("/api/productos/tienda");
  } else {
    return res.redirect("/api/productos/all");
  }
});

module.exports = routerHome;
