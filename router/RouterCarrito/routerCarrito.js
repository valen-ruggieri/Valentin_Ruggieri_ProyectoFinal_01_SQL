const express = require("express");
const routerCarrito = express.Router();
const carrito = require("./carrito.js");
const path = require("path");
const database = require("../../firebase/firebase");
const config = require("../../utils/config");
const logger = require("../../utils/logger");
const { Data } = require("../RouterHome/routerHome.js");



routerCarrito.use(express.static(path.join(__dirname + "/public")));


const uID = Data

//>| 1 - POST: '/' - Crea un carrito y devuelve su id.
//>| - POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto

routerCarrito.get("/carrito/add/:IDproducto", async (req, res) => {



  const productoFR = await database
  .collection("Productos")
  .doc(req.params.IDproducto)
  .get();
  const productoId = {
    id: productoFR.id,
    img: productoFR.data().img,
    titulo: productoFR.data().titulo,
    precio: productoFR.data().precioFormat,
    timestamp: productoFR.data().timestamp,
    descripcion: productoFR.data().descripcion,
    codigo: productoFR.data().codigo,
  };

  await database
    .collection("Users")
    .doc(uID.id)
    .collection("carrito")
    .add({...productoId});
  res.redirect("/api/productos/tienda");
});

//>| 2 - DELETE: '/:id' - Vacía un carrito y lo elimina.

routerCarrito.get("/carrito/delete", async (req, res) => {
  const array = await database
    .collection("Users")
    .doc(uID.id)
    .collection("carrito")
    .get();

  array.docs.map((doc) => doc.ref.delete());

  res.redirect("/api/carrito/productos");
});

//>| 3 - GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito

routerCarrito.get("/carrito/productos", async (req, res) => {
  const querySnapshot = await database
    .collection("Users")
    .doc(uID.id)
    .collection("carrito")
    .get();

  const productosCarrito = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    img: doc.data().img,
    titulo: doc.data().titulo,
    precio: doc.data().precioFormat,
    timestamp: doc.data().timestamp,
    descripcion: doc.data().descripcion,
    codigo: doc.data().codigo,
  }));

  res.render("carrito.ejs", { productosCarrito });
});

//>| 5 - DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto

routerCarrito.get("/carrito/delete/:id", async (req, res) => {
  await database
    .collection("Users")
    .doc(uID.id)
    .collection("carrito")
    .doc(req.params.id)
    .delete();
  res.redirect("/api/carrito/productos");
});

module.exports = routerCarrito;
