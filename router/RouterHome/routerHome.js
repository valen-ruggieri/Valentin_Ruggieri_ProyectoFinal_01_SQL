const express = require("express");
const routerHome = express.Router();
const path = require("path");
const logger = require("../../utils/logger");
const { Data } = require("../RouterUser/routerUser");
const HomeController = require("../../controllers/homeController");
const homeController = new HomeController();
const uID = Data;

routerHome.get("/", async (req, res) => {
  // todo|    restoreSession

  homeController.restoreSession(req,res);
});

module.exports = routerHome;
