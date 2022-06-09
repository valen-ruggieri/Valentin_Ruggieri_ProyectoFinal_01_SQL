const express = require("express");
const routerCarrito = express.Router();
const path = require("path");
const database = require("../../firebase/firebase");
const config = require("../../utils/config");
const logger = require("../../utils/logger");
const { userPermissionsClient, permissions } = require("../../utils/permissions");
const { Data } = require("../RouterUser/routerUser.js");



routerCarrito.use(express.static(path.join(__dirname + "/public")));


const uID = Data


//>| 1 - POST: '/' - Crea un carrito y devuelve su id.
//>| - POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto

routerCarrito.get("/carrito/add/:IDproducto", async (req, res) => {


  if (!userPermissionsClient(uID.userPermission)){return res.redirect('/errorRoute') }

  const date = new Date();
  const timestampCarrito = ` ${date.getDay()}/ ${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}: ${date.getMinutes()}: ${date.getSeconds()}`;


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
    .add({timestampCarrito,...productoId});
  res.redirect("/api/productos/tienda");
});

//>| 2 - DELETE: '/:id' - Vacía un carrito y lo elimina.

routerCarrito.get("/carrito/delete", async (req, res) => {
  if (!userPermissionsClient(uID.userPermission)){return res.redirect('/errorRoute') }
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
  if (!userPermissionsClient(uID.userPermission)){return res.redirect('/errorRoute') }
  const querySnapshot = await database
    .collection("Users")
    .doc(uID.id)
    .collection("carrito")
    .get();

  const productosCarrito = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    img: doc.data().img,
    titulo: doc.data().titulo,
    precio: doc.data().precio,
    timestamp: doc.data().timestamp,
    descripcion: doc.data().descripcion,
    codigo: doc.data().codigo,
  }));

  res.render("carrito.ejs", { productosCarrito });
});

//>| 5 - DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto

routerCarrito.get("/carrito/delete/:id", async (req, res) => {
  if (!userPermissionsClient(uID.userPermission)){return res.redirect('/errorRoute') }
  await database
    .collection("Users")
    .doc(uID.id)
    .collection("carrito")
    .doc(req.params.id)
    .delete();
  res.redirect("/api/carrito/productos");
});

module.exports = routerCarrito;
