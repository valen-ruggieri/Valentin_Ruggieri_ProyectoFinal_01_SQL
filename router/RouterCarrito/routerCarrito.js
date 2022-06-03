const express = require("express");
const routerCarrito = express.Router();
const carrito = require("./carrito.js");
const path = require("path");



routerCarrito.use(express.static(path.join(__dirname + "/public")));

routerCarrito.get("/carrito/:id/productos", (req, res) => {
  const id = req.params.id;
  const productosCarrito = carrito.filter((carrito) => carrito.id === id);
 // productosCarrito.map(producto => producto.title + producto.price + producto.img)
});

routerCarrito.post("/carrito", (req, res) => {
  const carrito = req.body;
  carrito.push(carrito);
  logger.info(carrito.id);
});

routerCarrito.post("/carrito/:id/productos", (req, res) => {
  const idCarrito = req.params.id;
  const newProducto = req.body;
  const carritoSelect = carrito.filter(carrito => carrito.id === idCarrito)
  carritoSelect.push(newProducto);
  logger.info(carrito.id);
});



routerCarrito.delete("/carrito/:id/productos/:id_prod", (req, res) => {
  const idCarrito = req.params.id;
  const idProducto = req.params.id_prod;
  const carritoSelect = carrito.filter(carrito => carrito.id === idCarrito);
  carritoSelect.slice(idProducto - 1, 1);
});


module.exports = routerCarrito;