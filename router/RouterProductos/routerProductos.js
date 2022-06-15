const express = require("express");
const routerProducts = express.Router();
const path = require("path");
const multer = require("multer");
const logger = require("../../utils/logger");
const ProductsController = require("../../controllers/productsController");
const productController = new ProductsController();
const {
  userPermissionsClient,
  userPermissionsAdmin,
} = require("../../utils/permissions");
const { Data } = require("../RouterUser/routerUser");
const validation = require("../../utils/Middlewares/validationMiddleware");
const productSchema = require("../../Validations/productValidation");
const validationProduct = require("../../utils/Middlewares/validationProduct");

routerProducts.use(express.static(path.join(__dirname + "/public")));
routerProducts.use(express.static("public"));
routerProducts.use(express.static("views"));
routerProducts.use(express.static("partials"));

const uID = Data;

//>|  multer config

const storageContent = multer.diskStorage({
  destination: path.join(__dirname + "/public/images"),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

routerProducts.use(
  multer({
    storage: storageContent,
    limits: { fileSize: 1000000 },
    dest: path.join(__dirname + "/public/images"),
  }).single("image")
);

// $                   CLIENTE

// $   Puede ver y agregar productos al carrito como asi tambien logearse

// >| getProducts
routerProducts.get("/productos/tienda", async (req, res) => {
  if (!userPermissionsClient(uID.userPermission)) {
    return res.redirect("/errorRoute");
  }
  productController.getProductsClient(req, res);
});

//>|  getProductId

routerProducts.get("/productos/producto/:id", async (req, res) => {
  if (!userPermissionsClient(uID.userPermission)) {
    return res.redirect("/errorRoute");
  }
  productController.getProductId(req, res);
});

//%                   ADMINISTRADOR

//%     Puede agregar, editar y borrar productos como asi tambien logearse

//>| getProducts
routerProducts.get("/productos/all", async (req, res) => {
  if (!userPermissionsAdmin(uID.userPermission)) {
    return res.redirect("/errorRoute");
  }

  productController.getProductsAdmin(req, res);
});

// >| deleteProduct

routerProducts.get("/productos/delete/:id", async (req, res) => {
  if (!userPermissionsAdmin(uID.userPermission)) {
    return res.redirect("/errorRoute");
  }
  productController.deleteProduct(req, res);
});

// >|  postProduct

routerProducts.post(
  "/productos/form",
  validationProduct(productSchema),
  async (req, res) => {
    if (!userPermissionsAdmin(uID.userPermission)) {
      return res.redirect("/errorRoute");
    }
    productController.postProduct(req, res);
  }
);

routerProducts.get("/productos/form", (req, res) => {
  if (!userPermissionsAdmin(uID.userPermission)) {
    return res.redirect("/errorRoute");
  }

  res.render("formAdd.ejs");
});

// >|  updateProduct

routerProducts.post(
  "/productos/update/:id",
  validationProduct(productSchema),
  async (req, res) => {
    if (!userPermissionsAdmin(uID.userPermission)) {
      return res.redirect("/errorRoute");
    }
    productController.updateProduct(req, res);
  }
);

routerProducts.get("/productos/update/:id", (req, res) => {
  if (!userPermissionsAdmin(uID.userPermission)) {
    return res.redirect("/errorRoute");
  }

  res.render("formUpdate.ejs");
});

module.exports = routerProducts;
