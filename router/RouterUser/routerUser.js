const express = require("express");
const routerUser = express.Router();
const path = require("path");
const validation = require("../../utils/Middlewares/validationMiddleware");
const userschema = require("../../Validations/userValidation");
const {UserController,userData} = require("../../controllers/usersController");
const userController = new UserController();

routerUser.use(express.static(path.join(__dirname + "/public")));

const Data =userData;

//>|  getUser 
routerUser.get("/user", (req, res) => {
  res.render("user.ejs");
});

//>|  postUser  
routerUser.post("/user", validation(userschema), async (req, res) => {
  userController.addUser(req,res);
});

module.exports = { routerUser, Data };
