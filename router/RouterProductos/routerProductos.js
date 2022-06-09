const express = require("express");
const routerProducts = express.Router();
const path = require("path");
const multer = require("multer");
const logger = require("../../utils/logger");
const database = require("../../firebase/firebase");
const config = require("../../utils/config");
const imgRandom = require("../../utils/imgRandom");
const { userPermissionsClient, userPermissionsAdmin } = require("../../utils/permissions");
const { Data } = require("../RouterUser/routerUser");

routerProducts.use(express.static(path.join(__dirname + "/public")));
routerProducts.use(express.static(path.join('/public')));


const uID = Data;



//>|  multer config

const storageContent = multer.diskStorage({
  destination: (path.join(__dirname + "/public/images")),
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

routerProducts.use(
  multer({
    storage: storageContent,
    limits: { fileSize: 1000000 },
    dest:  (path.join(__dirname + "/public/images")),
  }).single("image")
);

// $                   CLIENTE

// $   Puede ver y agregar productos al carrito como asi tambien logearse

// >| get productos
routerProducts.get("/productos/tienda", async (req, res) => {

  if (!userPermissionsClient(uID.userPermission)){return res.redirect('/errorRoute') }

  const querySnapshot = await database.collection("Productos").get();
  const productos = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    img: doc.data().img,
    titulo: doc.data().titulo,
    precio: doc.data().precioFormat,
    timestamp: doc.data().timestamp,
    descripcion: doc.data().descripcion,
    codigo: doc.data().codigo,
    producto:` ${doc.data().titulo}, ${doc.data().precioFormat}`,
    // ` ${doc.data().img},${ doc.data().titulo},${doc.data().precioFormat},${doc.data().timestamp},${doc.data().descripcion},${doc.data().codigo}`
  }));
  res.render("productosClientes.ejs", { productos });
});

// >| get id productos


routerProducts.get("/productos/producto/:id", async (req, res) => {
  if (!userPermissionsClient(uID.userPermission)){return res.redirect('/errorRoute') }
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

// >| ruta de chat

routerProducts.get('/productos/chat',(req,res)=>{
  res.render('chatClient.ejs')
})




//%                   ADMINISTRADOR

//%     Puede agregar, editar y borrar productos como asi tambien logearse

// >| get productos
routerProducts.get("/productos/all", async (req, res) => {
  if (!userPermissionsAdmin(uID.userPermission)){return res.redirect('/errorRoute') }
  
  const querySnapshot = await database.collection("Productos").get();
  const productos = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    img: doc.data().img,
    titulo: doc.data().titulo,
    precio: doc.data().precioFormat,
    timestamp: doc.data().timestamp,
    descripcion: doc.data().descripcion,
    codigo: doc.data().codigo,
   
  }));
  res.render("productosAdmin.ejs", { productos });
});



// >| delete producto

routerProducts.get("/productos/delete/:id", async (req, res) => {
  if (!userPermissionsAdmin(uID.userPermission)){return res.redirect('/errorRoute') }

  await database.collection("Productos").doc(req.params.id).delete();
  res.redirect("/api/productos/all");
});

// >| ruta post de productos

routerProducts.post("/productos/form", async (req, res) => {
  if (!userPermissionsAdmin(uID.userPermission)){return res.redirect('/errorRoute') }

  const { titulo, precio, descripcion, codigo } = req.body;
  const file = req.file;
  const img = file.filename;
  const precioFormat = Number(precio);
  const date = new Date();
  const timestamp = ` ${date.getDay()}/ ${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}: ${date.getMinutes()}: ${date.getSeconds()}`;

  await database
    .collection("Productos")
    .add({ titulo, precioFormat, timestamp, descripcion, codigo, img });
  res.redirect("/api/productos/all");
});

routerProducts.get("/productos/form", (req, res) => {
  if (!userPermissionsAdmin(uID.userPermission)){return res.redirect('/errorRoute') }

  res.render("tienda.ejs", { imgRandom: imgRandom() });
});

//>| ruta post de actualizacion de productos

routerProducts.post("/productos/producto/update/:id", (req, res) => {
  if (!userPermissionsAdmin(uID.userPermission)){return res.redirect('/errorRoute') }

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
  if (!userPermissionsAdmin(uID.userPermission)){return res.redirect('/errorRoute') }

  res.render("formUpdate.ejs");
});

module.exports = routerProducts;
