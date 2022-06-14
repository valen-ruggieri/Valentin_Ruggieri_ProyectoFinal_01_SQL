const options = require("./config/configDB");
const knex = require("knex");

const initDB = async () => {
  const db = knex(options.mysql);
  try {
    await db.schema.createTableIfNotExists("Products", (table) => {
      table.increments("id").primary();
      table.string('titulo');
      table.string('descripcion');
      table.integer('precio');
      table.integer('stock');
      table.string('img');
      table.string('codigo');


    });
  } catch (err) {
    console.log(err);
  }
};
initDB()