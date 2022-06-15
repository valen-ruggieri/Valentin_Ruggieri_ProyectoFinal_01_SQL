const knex = require("knex");
const options = require("../config/configDB");
const database = knex(options.mysql);
const tableUsers = "Users";
let userData = { };


class UserController {
  constructor() {}

  // todo|   userData
  async userData(email, password) {
    try {
    //   const users = await database(tableUsers)
    //   .where("password", password)
    //   .where("email", email)
    // const dataRef = users.forEach((user) => ({
    //   id: id,
    //   nameUser: userName,
    //   password:password,
    //   userPermission: userType,
    // }));

    // return dataRef[0];
    } catch (error) {
      return res.render("errorUser.ejs");
    }
  }

  // >|  addUser
  async addUser(req, res) {
    try {
    
    const {  email, password,userName, userType } = req.body;
  
    await database(tableUsers).insert({  email, password,userName, userType })
    //todo| extraer id con la funcion usrer data 9
    userData.userPermission = userType;
    userData.userName = userName;
    console.log('Sesion de '+userData.userPermission+' Iniciada - User:'+userData.userName)
    if (userType === "cliente") {
      return res.redirect("/api/productos/tienda");
    } else {
         return res.redirect("/api/productos/all");
    }
   
    
    } catch (error) {
      const errorName = 'Failed create table users'
      const errorDescription = error;
      return res.render("errorUser.ejs",{errorName,errorDescription});
    }
  }
}

module.exports = {UserController,userData};
