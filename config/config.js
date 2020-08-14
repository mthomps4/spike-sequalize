require("dotenv").config();

const { DB_HOST, DB_USER, DB_PASS, DB_PORT, DB_NAME } = process.env;

module.exports = {
  development: {
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASS,
    database: 'sequalize_dev',
    dialect: "postgres",
  },
  test: {
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASS,
    database: "sequelize_test",
    dialect: "postgres",
  },
  production: {
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASS,
    database: "sequelize_production",
    dialect: "postgres",
  },
};
