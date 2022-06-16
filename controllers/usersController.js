const knex = require("knex");
const options = require("../config/configDB");
const database = knex(options.sqlite3);
const tableUsers = "Users";
let userData = {};

class UserController {
  //>|  initHome

  async initUser() {
    try {
      await database.schema.hasTable(tableUsers).then(async (exists) => {
        if (!exists) {
          return await database.schema.createTable(tableUsers, (table) => {
            table.increments("id").primary();
            table.string("userName");
            table.string("email");
            table.string("password");
            table.string("userType");
          });
        }
      });
    } catch (error) {
      const errorName = "Failed create table users";
      const errorDescription = error;
      return res.render("errorUser.ejs", { errorName, errorDescription });
    }
  }

  //>|  deleteUser
  async deleteUser() {
    try {
      await database.schema.dropTableIfExists(tableUsers);
    } catch (error) {
      console.log(error);
      return res.redirect("/errorRoute");
    }
  }

  // >|  addUser
  async addUser(req, res) {
    try {
      const { email, password, userName, userType } = req.body;
      await database(tableUsers).insert({
        email,
        password,
        userName,
        userType,
      });
      userData.userPermission = userType;
      userData.userName = userName;
      console.log(
        "Sesion de " +
          userData.userPermission +
          " Iniciada - User:" +
          userData.userName
      );
      if (userType === "cliente") {
        return res.redirect("/api/productos/tienda");
      } else {
        return res.redirect("/api/productos/all");
      }
    } catch (error) {
      const errorName = "Failed create table users";
      const errorDescription = error;
      return res.render("errorUser.ejs", { errorName, errorDescription });
    }
  }
}

module.exports = { UserController, userData };
