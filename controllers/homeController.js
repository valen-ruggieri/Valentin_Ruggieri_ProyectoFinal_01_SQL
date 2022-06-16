const knex = require("knex");
const options = require("../config/configDB");
const { initDB, deleteDB } = require("../startDB");

class HomeController {
  constructor() {}

  // todo|    restoreSession
  async restoreSession(req, res) {
    try {
      await deleteDB();
      await initDB();
      
      return res.render("home.ejs");
    } catch (error) {
      const errorName = "Failed create table users";
      const errorDescription = error;
      return res.render("errorUser.ejs", { errorName, errorDescription });
    }
  }
}

module.exports = HomeController;
