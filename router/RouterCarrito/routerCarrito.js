const express = require("express");
const routerCarrito = express.Router();
const path = require("path");
const logger = require("../../utils/logger");
const {
  userPermissionsClient,
  permissions,
} = require("../../utils/permissions");
const { Data } = require("../RouterUser/routerUser.js");
const CartController = require("../../controllers/cartsController");
const cartController = new CartController();

routerCarrito.use(express.static(path.join(__dirname + "/public")));

const uID = Data;

// todo| getCart

routerCarrito.get("/carrito/productos", async (req, res) => {
  if (!userPermissionsClient(uID.userPermission)) {
    return res.redirect("/errorRoute");
  }
  cartController.getCart(req, res);
});

// todo| addProductToCart

routerCarrito.get("/carrito/add/:IDproducto", async (req, res) => {
  if (!userPermissionsClient(uID.userPermission)) {
    return res.redirect("/errorRoute");
  }
  cartController.addProductToCart(req, res);
});

// todo| deleteCart

routerCarrito.get("/carrito/delete", async (req, res) => {
  if (!userPermissionsClient(uID.userPermission)) {
    return res.redirect("/errorRoute");
  }
  cartController.deleteCart(req, res);
});

// todo| deleteProductToCart

routerCarrito.get("/carrito/delete/:id", async (req, res) => {
  if (!userPermissionsClient(uID.userPermission)) {
    return res.redirect("/errorRoute");
  }
  cartController.deleteProductToCart(req, res);
});

module.exports = routerCarrito;
