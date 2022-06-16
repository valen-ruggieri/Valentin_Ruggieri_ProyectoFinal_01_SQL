const express = require("express");
const routerCarrito = express.Router();
const path = require("path");
const { userPermissionsClient } = require("../../utils/permissions");
const { Data } = require("../RouterUser/routerUser.js");
const CartController = require("../../controllers/cartsController");
const userPermission = require("../../Validations/userPermission");
const cartController = new CartController();
const uID = Data;


routerCarrito.use(express.static(path.join(__dirname + "/public")));



// >| getCart       

routerCarrito.get("/carrito/productos", async (req, res) => {
  userPermission(userPermissionsClient(uID.userPermission));
  await cartController.getCart(req, res);
});

//>| addProductToCart

routerCarrito.get("/carrito/add/:IDproducto", async (req, res) => {
  userPermission(userPermissionsClient(uID.userPermission));
  await cartController.addProductToCart(req, res);
});

//>| deleteCart     

routerCarrito.get("/carrito/delete", async (req, res) => {
  userPermission(userPermissionsClient(uID.userPermission));
  await cartController.deleteCart(req, res);
});

//>| deleteProductToCart

routerCarrito.get("/carrito/delete/:id", async (req, res) => {
  userPermission(userPermissionsClient(uID.userPermission));
  await cartController.deleteProductToCart(req, res);
});

module.exports = routerCarrito;
