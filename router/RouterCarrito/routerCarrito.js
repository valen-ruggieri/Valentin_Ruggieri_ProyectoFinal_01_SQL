const express = require("express");
const routerCarrito = express.Router();
const carrito = require("./carrito.js");
const path = require("path");
const database = require("../../firebase/firebase");
const config = require("../../utils/config");
const logger = require("../../utils/logger");

routerCarrito.use(express.static(path.join(__dirname + "/public")));

//>| 1 - POST: '/' - Crea un carrito y devuelve su id.
//>| - POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto

routerCarrito.get("/carrito/add/:producto", async (req, res) => {
  const producto = req.params.producto;
  const productoNew = producto.split(",");

  await database
    .collection("Users")
    .doc("nsshn93SEfV3qge1WHd3")
    .collection("carrito")
    .add({ titulo: productoNew[0], precio: Number(productoNew[1]) });
  res.redirect("/api/productos/tienda");
});

//>| 2 - DELETE: '/:id' - Vacía un carrito y lo elimina.

routerCarrito.get("/carrito/delete", async (req, res) => {
  const array = await database
    .collection("Users")
    .doc("nsshn93SEfV3qge1WHd3")
    .collection("carrito")
    .get();

  array.docs.map((doc) => doc.ref.delete());

  res.redirect("/api/carrito/productos");
});

//>| 3 - GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito

routerCarrito.get("/carrito/productos", async (req, res) => {
  const querySnapshot = await database
    .collection("Users")
    .doc("nsshn93SEfV3qge1WHd3")
    .collection("carrito")
    .get();

  const productosCarrito = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    titulo: doc.data().titulo,
    precio: doc.data().precio,
  }));

  res.render("carrito.ejs", { productosCarrito });
});

//>| 5 - DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto

routerCarrito.get("/carrito/delete/:id", async (req, res) => {
  await database
    .collection("Users")
    .doc("nsshn93SEfV3qge1WHd3")
    .collection("carrito")
    .doc(req.params.id)
    .delete();
  res.redirect("/api/carrito/productos");
});

module.exports = routerCarrito;
