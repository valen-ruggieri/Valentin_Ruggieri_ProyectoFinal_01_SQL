const options = require("./config/configDB");
const knex = require("knex");

const initDB = async () => {
  const db = knex(options.mysql);
  try {
    await db.schema.hasTable("Products").then(async (exists) => {
      if (!exists) {
        return await db.schema.createTable("Products", (table) => {
          table.increments("id").primary();
          table.string("titulo");
          table.string("descripcion");
          table.integer("precio");
          table.integer("timestamp");
          table.string("img");
          table.string("codigo");
        });
      }
    });

    await db.schema.hasTable("Cart").then(async(exists) => {
      if (!exists) {
        return await db.schema.createTable("Cart", (table) => {
          table.increments("id").primary();
          table.string("titulo");
          table.string("descripcion");
          table.integer("timestamp");
          table.integer("precio");
          table.string("img");
          table.string("codigo");
        });
      }
    });

    await db.schema.hasTable("Users").then(async(exists) => {
      if (!exists) {
        return await db.schema.createTable("Users", (table) => {
      table.increments("id").primary();
      table.string("userName");
      table.string("email");
      table.string("password");
      table.string("userType");
    });
  }
});
  } catch (err) {
    console.log(err);
  }
};

const deleteDB = async () => {
  const db = knex(options.mysql);
  try {
    await db.schema.dropTableIfExists("Cart");
    await db.schema.dropTableIfExists("Users");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { initDB, deleteDB };
