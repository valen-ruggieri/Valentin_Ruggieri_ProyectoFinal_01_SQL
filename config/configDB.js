require("dotenv").config();

const options = {
  mysql: {
    client: "mysql",
    connection: {
      host: "localhost",
      user: "root",
      password: process.env.DB_PASSWORD,
      database: "shop",
    },
    pool: { min: 0, max: 10 },
  },

  sqlite3: {
    client: "sqlite3",
    connection: { filename: "../database/shop.sqlite" },
    useNullAsDefault: true,
  },
};

module.exports= options;