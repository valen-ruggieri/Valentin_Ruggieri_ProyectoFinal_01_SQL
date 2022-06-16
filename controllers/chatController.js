const knex = require("knex");
const options = require("../config/configDB");
const { userData } = require("./usersController");
const database = knex(options.sqlite3);
const tableChat = "Chat";
const uID = userData;

class ChatController {
  // >|   inintChat

  async initChaT() {
    try {
      await database.schema.createTable(tableChat, (table) => {
        table.string("autor");
        table.string("date");
        table.string("text");
      });
      console.log("chat iniciado");
    } catch (error) {
      console.log(error);
    }
  }

  async deleteChat() {
    try {
      await database.schema.dropTableIfExists(tableChat);
    } catch (error) {
      console.log(error);
    }
  }

  // >| getMessages
  async getMessages(req, res) {
    try {
      const messages = await database.from(tableChat).select("*");
      res.render("chatPage.ejs", { messages, uID });
    } catch (error) {
      console.log(error);
    }
  }

  // >|  addMessages
  async addMessages(message) {
    try {
      const { autor, text } = message;
      const date = new Date();
      const dateNow = ` ${date.getHours()}: ${date.getMinutes()}: ${date.getSeconds()}`;
      await database(tableChat).insert({ autor, date: dateNow, text });
    } catch (error) {
      console.log(error);
    }
  }

  // >|  deleteMessages
  async deleteMessages() {
    try {
      await database(tableChat).del();
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ChatController;
