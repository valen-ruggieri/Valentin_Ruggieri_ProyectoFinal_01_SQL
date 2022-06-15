const knex = require("knex");
const options = require("../config/configDB");
const { userData } = require("./usersController");
const database = knex(options.sqlite3);
const tableChat = "Chat";
const uID = userData;

class ChatController {
  // todo|   inintChat

  async initChaT() {


   try{ 
   await database.schema.dropTableIfExists(tableChat)
    await database.schema.createTableIfNotExists(tableChat, (table) => {
      table.string("autor");
      table.string("date");
      table.string("text");
    });
    console.log("chat iniciado");}
    catch(error){
      console.log(error)
    }
  }

  // todo|   arrayMessages
  async arrayMessages() {
    try {
      const arrayMessages = await database.from(tableChat).select("*");
      console.log(arrayMessages)
      return arrayMessages;
    } catch (error) {
      console.log(error);
    }
  }
  // todo| getMessages
  async getMessages(req, res) {
    try {
      await database.from(tableChat).select("*");

      res.render("chatPage.ejs", { uID });
    } catch (error) {
        console.log(error)
    //   return res.render("errorUser.ejs");
    }
  }

  // todo|   addMessages
  async addMessages(message) {
    try {
      const { autor, date, text } = message;
      console.log(autor, date, text);
      await database(tableChat).insert({ autor, date, text });
    
    } catch (error) {
        console.log(error)
    //   return res.render("errorUser.ejs");
    }
  }

  // todo|   deleteMessages
  async deleteMessages() {
    try {
      await database(tableChat).del();
    } catch (error) {
        console.log(error)
    //   return res.render("errorUser.ejs");
    }
  }
}

module.exports = ChatController;
