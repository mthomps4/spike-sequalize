require("dotenv").config();

const { DB_HOST, DB_USER, DB_PASS, DB_PORT, DB_URL, DB_NAME } = process.env;

// HEROKU POSTGRES CONFIG
module.exports = {
  development: {
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        // Ref.: https://github.com/brianc/node-postgres/issues/2009
        rejectUnauthorized: false,
      },
      keepAlive: true,        
    },      
    ssl: true,
  },
  // test: {
  //   host: DB_HOST,
  //   port: DB_PORT,
  //   username: DB_USER,
  //   password: DB_PASS,
  //   database: "sequelize_test",
  //   dialect: "postgres",
  // },
  // production: {
  //   host: DB_HOST,
  //   port: DB_PORT,
  //   username: DB_USER,
  //   password: DB_PASS,
  //   database: "sequelize_production",
  //   dialect: "postgres",
  // },
};
