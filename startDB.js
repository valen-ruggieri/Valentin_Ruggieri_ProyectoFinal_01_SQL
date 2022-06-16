const options = require("./config/configDB");
const knex = require("knex");
const ChatController = require("./controllers/chatController");
const chatController = new ChatController();
const CartController = require("./controllers/cartsController");
const cartController = new CartController();
const ProductsController = require("./controllers/productsController");
const productController = new ProductsController();
const { UserController } = require("./controllers/usersController");
const userController = new UserController();
const initDB = async () => {
  const db = knex(options.sqlite3);
  try {
    await chatController.initChaT();
    await productController.initProducts();
    await userController.initUser();
    await cartController.initCart();
  } catch (err) {
    console.log(err);
  }
};

const deleteDB = async () => {
  const db = knex(options.mysql);
  try {
    await chatController.deleteChat();
    await cartController.deleteCart();
    await userController.deleteUser();
  } catch (err) {
    console.log(err);
  }
};

module.exports = { initDB, deleteDB };
