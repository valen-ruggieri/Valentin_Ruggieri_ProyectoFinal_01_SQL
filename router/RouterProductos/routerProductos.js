const express = require("express");
const routerProducts = express.Router();
const path = require("path");
const multer = require("multer");
const ProductsController = require("../../controllers/productsController");
const productController = new ProductsController();
const { userPermissionsClient,userPermissionsAdmin} = require("../../utils/permissions");
const { Data } = require("../RouterUser/routerUser");
const productSchema = require("../../Validations/productValidation");
const validationProduct = require("../../utils/Middlewares/validationProduct");
const userPermission = require("../../Validations/userPermission");
const uID = Data;
const storageContent = multer.diskStorage({
  destination: path.join(__dirname + "/public/images"),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});


routerProducts.use(express.static(path.join(__dirname + "/public")));
routerProducts.use(express.static("public"));
routerProducts.use(express.static("views"));
routerProducts.use(express.static("partials"));



//>|  multer config

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
  userPermission(userPermissionsClient(uID.userPermission))
  await productController.getProductsClient(req, res);
});

//>|  getProductId

routerProducts.get("/productos/producto/:id", async (req, res) => {
  userPermission(userPermissionsClient(uID.userPermission))
  await productController.getProductId(req, res);
});

//%                   ADMINISTRADOR

//%     Puede agregar, editar y borrar productos como asi tambien logearse

//>| getProducts
routerProducts.get("/productos/all", async (req, res) => {
  userPermission(userPermissionsAdmin(uID.userPermission))
  await productController.getProductsAdmin(req, res);
});

// >| deleteProduct

routerProducts.get("/productos/delete/:id", async (req, res) => {
  userPermission(userPermissionsAdmin(uID.userPermission))
  await productController.deleteProduct(req, res);
});

// >|  postProduct

routerProducts.post(
  "/productos/form",
  validationProduct(productSchema),
  async (req, res) => {
    userPermission(userPermissionsAdmin(uID.userPermission))
    await productController.postProduct(req, res);
  }
);

routerProducts.get("/productos/form", (req, res) => {
  userPermission(userPermissionsAdmin(uID.userPermission))
  res.render("formAdd.ejs");
});

// >|  updateProduct

routerProducts.post(
  "/productos/update/:id",
  validationProduct(productSchema),
  async (req, res) => {
    userPermission(userPermissionsAdmin(uID.userPermission))
    await productController.updateProduct(req, res);
  }
);

routerProducts.get("/productos/update/:id", (req, res) => {
  userPermission(userPermissionsAdmin(uID.userPermission))
  res.render("formUpdate.ejs");
});

module.exports = routerProducts;
