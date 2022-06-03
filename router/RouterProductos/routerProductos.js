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


//get firestore cliente
routerProducts.get("/productos/all", async(req, res) => {
 
   //database.ref('products').once('value',(snapshot)=>{
 
      const querySnapshot = await database.collection('Productos').get()
     const productos = querySnapshot.docs.map(doc => ({
       id : doc.id,
      titulo: doc.data().titulo,
      precio: doc.data().precio}))
      logger.info(productos)
      res.render('productosCliente.ejs',{productos})
  })



//delete firestore
routerProducts.get("/delete/:id", (req, res) => {
  const productoId = req.params.id
  //database.ref('products/' + productoId).remove()
  logger.info(`Eliminaste el producto id : ${productoId}`)
  res.redirect('/')
 })



// routerProducts.get("/productos/:id", (req, res) => {
//   const id = req.params.id;
//   const productoId = productos.filter((producto) => producto.id === id);
// });

//post firestore administrador

routerProducts.post("/productos/form", (req, res) => {
  const {titulo,precio} = req.body;
  logger.info(titulo,precio)
 database.collection("Productos").add({titulo,precio});
  res.redirect("/api/productos/form");
});

routerProducts.get("/productos/form", (req, res) => {
  
  res.render('tienda.ejs')
 
});


// routerProducts.put("/productos/:id", (req, res) => {
//   const producto = req.body;
//   const id = req.params.id;
//   productos.slice(id - 1, 1, producto);
// });

// routerProducts.delete("/productos/:id", (req, res) => {
//   const id = req.params.id;
//   productos.slice(id - 1, 1);
// });

// routerProducts.use(multer(multerConfig).single("image"));

module.exports = routerProducts;

