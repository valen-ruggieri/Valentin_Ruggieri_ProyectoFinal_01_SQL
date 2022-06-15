const knex = require("knex");
const options = require("../config/configDB");
const { userData } = require("./usersController");
const database = knex(options.mysql);
const tableProducts = "Products";

const uID = userData;

class ProductsController {
  constructor() {}

  //>|  getProductsClient
  async getProductsClient(req, res) {
    try {
      const productos = await database.from(tableProducts).select("*");
      res.render("productosClientes.ejs", { productos, uID });
    } catch (error) {
      return res.redirect("/errorRoute");
    }
  }
  // >| getProductsAdmin
  async getProductsAdmin(req, res) {
    try {
      const productos = await database.from(tableProducts).select("*");
      res.render("productosAdmin.ejs", { productos, uID });
    } catch (error) {
      return res.redirect("/errorRoute");
    }
  }
  //>|  getProductId
  async getProductId(req, res) {
    try {
      let producto = await database
        .from(tableProducts)
        .select("*")
        .where("id", req.params.id);
      producto = producto[0];
      console.log(producto);
      res.render("productoId.ejs", { producto, uID });
    } catch (error) {
      console.log(error);
      return res.redirect("/errorRoute");
    }
  }

  // >|  deleteProduct
  async deleteProduct(req, res) {
    try {
      await database(tableProducts).where("id", req.params.id).del();
      res.redirect("/api/productos/all");
    } catch (error) {
      return res.redirect("/errorRoute");
    }
  }

  // >| postProduct
  async postProduct(req, res) {
    try {
      const { titulo, precio, descripcion, codigo } = req.body;
      const img = req.file.filename;
      const precioFormat = Number(precio);
      const date = new Date();
      const timestamp = ` ${date.getDay()}/ ${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}: ${date.getMinutes()}: ${date.getSeconds()}`;
      await database(tableProducts).insert({
        titulo: titulo,
        descripcion: descripcion,
        precio: precioFormat,
        timestamp: timestamp,
        img: img,
        codigo: codigo,
      });

      res.redirect("/api/productos/all");
    } catch (error) {
      console.log(error);
      return res.redirect("/errorRoute");
    }
  }

  // >| updateProduct
  async updateProduct(req, res) {
    try {
      const { titulo, precio, descripcion, codigo } = req.body;
      const img = req.file.filename;
      const precioFormat = Number(precio);
      const date = new Date();
      const timestamp = ` ${date.getDay()}/ ${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}: ${date.getMinutes()}: ${date.getSeconds()}`;
      await database(tableProducts).where("id", req.params.id).update({
        titulo: titulo,
        descripcion: descripcion,
        precio: precioFormat,
        timestamp: timestamp,
        img: img,
        codigo: codigo,
      });
      res.redirect("/api/productos/all");
    } catch (error) {
      return res.redirect("/errorRoute");
    }
  }
}

module.exports = ProductsController;
