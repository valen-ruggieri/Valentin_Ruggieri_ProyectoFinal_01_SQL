const knex = require("knex");
const options = require("../config/configDB");
const { userData } = require("./usersController");
const database = knex(options.sqlite3);
const tableCart = "Cart";
const uID = userData;

class CartController {
  // >| initCart
  async initCart() {
    try {
      await database.schema.hasTable(tableCart).then(async (exists) => {
        if (!exists) {
          return await database.schema.createTable(tableCart, (table) => {
            table.increments("id").primary();
            table.string("titulo");
            table.string("descripcion");
            table.integer("timestamp");
            table.integer("precio");
            table.string("img");
            table.string("codigo");
          });
        }
      });
    } catch (error) {
      console.log(error);
      return res.redirect("/errorRoute");
    }
  }

  // >| deleteCart
  async deleteCart() {
    try {
      await database.schema.dropTableIfExists(tableCart);
    } catch (error) {
      console.log(error);
      return res.redirect("/errorRoute");
    }
  }
  // >| getCart
  async getCart(req, res) {
    try {
      const productosCarrito = await database.from(tableCart).select("*");
      res.render("carrito.ejs", { productosCarrito, uID });
    } catch (error) {
      console.log(error);
      return res.redirect("/errorRoute");
    }
  }

  // >| addProductToCart
  async addProductToCart(req, res) {
    try {
      let producto = await database
        .from("Products")
        .where("id", req.params.IDproducto);
      producto = producto[0];
      await database(tableCart).insert(producto);

      res.redirect("/api/productos/tienda");
    } catch (error) {
      console.log(error);
      return res.redirect("/errorRoute");
    }
  }

  // >| deleteCart
  async deleteCart(req, res) {
    try {
      await database(tableCart).del();
      res.redirect("/api/carrito/productos");
    } catch (error) {
      console.log(error);
      return res.redirect("/errorRoute");
    }
  }

  // >| deleteProductToCart
  async deleteProductToCart(req, res) {
    try {
      console.log(req.params.id);
      await database.from(tableCart).where("id", req.params.id).del();
      res.redirect("/api/carrito/productos");
    } catch (error) {
      console.log(error);
      return res.redirect("/errorRoute");
    }
  }
}

module.exports = CartController;
