const express = require("express");
const routerProducts = express.Router();
const path = require("path");
const productos = require("./productos");
const multer = require("multer");
const logger = require("../../utils/logger");
const multerConfig = require("../../utils/multer");
const database = require("../../firebase/firebase");
const config = require("../../utils/config");

routerProducts.use(express.static(path.join(__dirname + "/public")));

// $                   CLIENTE

// $   Puede ver y agregar productos al carrito como asi tambien logearse

// >| get productos
routerProducts.get("/productos/tienda", async (req, res) => {
  const querySnapshot = await database.collection("Productos").get();
  const productos = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    titulo: doc.data().titulo,
    precio: doc.data().precioFormat,
    producto: [doc.data().titulo, doc.data().precioFormat],
  }));
  res.render("productosClientes.ejs", { productos });
});

// >| get id productos

//%                   ADMINISTRADOR

//%     Puede agregar, editar y borrar productos como asi tambien logearse

// >| get productos
routerProducts.get("/productos/all", async (req, res) => {
  const querySnapshot = await database.collection("Productos").get();
  const productos = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    titulo: doc.data().titulo,
    precio: doc.data().precioFormat,
  }));
  res.render("productosAdmin.ejs", { productos });
});

// >| get id productos

routerProducts.get("/productos/producto/:id", async (req, res) => {
  const productoFR = await database
    .collection("Productos")
    .doc(req.params.id)
    .get();
  const productoId = {
    id: productoFR.id,
    titulo: productoFR.data().titulo,
    precio: productoFR.data().precioFormat,
  };
  res.render("productoid.ejs", { productoId });
});

// >| delete producto

routerProducts.get("/productos/delete/:id", (req, res) => {
  database.collection("Productos").doc(req.params.id).delete();
  res.redirect("/api/productos/all");
});

// >| ruta post de productos
routerProducts.post("/productos/form", async (req, res) => {
  const { titulo, precio } = req.body;
  const precioFormat = Number(precio);
  await database.collection("Productos").add({ titulo, precioFormat });
  res.redirect("/api/productos/all");
});

routerProducts.get("/productos/form", (req, res) => {
  res.render("tienda.ejs");
});

//>| ruta post de actualizacion de productos

routerProducts.post("/productos/producto/update/:id", (req, res) => {
  const { titulo, precio } = req.body;
  const precioFormat = Number(precio);

  database
    .collection("Productos")
    .doc(req.params.id)
    .update({ titulo, precioFormat });
  logger.info("producto actualizado");
  res.redirect("/api/productos/all");
});
routerProducts.get("/productos/producto/update/:id", (req, res) => {
  res.render("formUpdate.ejs");
});

module.exports = routerProducts;
