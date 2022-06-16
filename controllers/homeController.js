const { initDB, deleteDB } = require("../startDB");

class HomeController {
  // >|    restoreSession
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
