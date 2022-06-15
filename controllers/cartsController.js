const knex = require("knex");
const options = require("../config/configDB");
const { userData } = require("./usersController");
const database = knex(options.mysql);
const tableCart = "Cart";
const uID = userData;

class CartController {
  constructor() {}
  u;

  // todo| getCart
  async getCart(req, res) {
    try {
      const productosCarrito = await database.from(tableCart).select("*");
      res.render("carrito.ejs", { productosCarrito, uID });
    } catch (error) {
      console.log(error)
      return res.redirect("/errorRoute");
    }
  }

  // todo| addProductToCart
  async addProductToCart(req, res) {
    try {
      console.log(req.params.IDproducto)
  let producto = await database.from('Products').where('id',req.params.IDproducto)
  producto = producto[0]
console.log(producto)
  await database(tableCart).insert(producto)

  res.redirect("/api/productos/tienda");
    } catch (error) {
      console.log(error)
      return res.redirect("/errorRoute");
    }
  }

  // todo| deleteCart
  async deleteCart(req, res) {
    try {
      await database(tableCart).del()
  res.redirect("/api/carrito/productos"); 
    } catch (error) {
      console.log(error)
      return res.redirect("/errorRoute");
    }
  }

  // todo| deleteProductToCart
  async deleteProductToCart(req, res) {
    try {
      console.log(req.params.id)
      await database.from(tableCart).where('id',req.params.id).del()
      res.redirect("/api/carrito/productos"); 
    } catch (error) {
      console.log(error)
      return res.redirect("/errorRoute");
    }
  }
}

module.exports = CartController;
