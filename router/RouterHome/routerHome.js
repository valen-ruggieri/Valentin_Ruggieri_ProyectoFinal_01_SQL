const express = require("express");

const database = require("../../firebase/firebase");
const routerHome = express.Router();
const path = require("path");
const logger = require("../../utils/logger");

routerHome.use(express.static(path.join(__dirname + "/public")));

let Data = { id: "" };

const userSession = async (email, password) => {
  const user = await database
    .collection("Users")
    .where("password", "==", password)
    .where("email", "==", email)
    .get();
  const dataRef = user.docs.map((user) => ({
    id: user.id,
    name: user.data().name,
    password: user.data().password,
    userType: user.data().userType,
  }));

  return dataRef[0];
};
routerHome.get("/home", (req, res) => {
  res.render("home.ejs");
});

routerHome.post("/home", async (req, res) => {
  const { name, email, password, userType } = req.body;
  const carrito = [];

  await database
    .collection("Users")
    .add({ name, email, password, userType, carrito });

  const { id } = await userSession(email, password);
  Data.id = id;

  if (userType === "cliente") {
    return res.redirect("/api/productos/tienda");
  } else {
    return res.redirect("/api/productos/all");
  }
});

module.exports = { routerHome, Data };
