const knex = require("knex");
const options = require("../config/configDB");
const { initDB, deleteDB } = require("../startDB");

const database = knex(options.mysql);
const table = "Users";

class HomeController {
  constructor() {}

  // todo|    restoreSession
  async restoreSession(req, res) {
    const db = knex(options.mysql);
    try {
      /** if(uID.id !== ''){
        await database.collection('Users').doc(uID.id).delete();
        logger.info('Sesion de '+uID.userPermission+' Cerrada - uID:'+uID.id)
        Data.id = '';
        Data.userPermission = '';}
        res.render('home.ejs') */
        // await db.schema.dropTableIfExists('Users')
      //   await db.schema.createTable("Users",(table)=>{
      //     table.string("username");
      //     table.string("email");
      //     table.string("password");
      //     table.string("usertype");
        deleteDB()
        initDB()
      
       console.log('TABLAS CREADAS')
        return res.render('home.ejs') 
    } catch (error) {
      const errorName = 'Failed create table users'
      const errorDescription = error;
      return res.render("errorUser.ejs",{errorName,errorDescription});
    }
  }
}

module.exports = HomeController;
