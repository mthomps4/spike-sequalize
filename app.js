const express = require("express");
const app = express();
const port = process.env.PORT;

const {Sequelize} = require('sequelize');
const config = require("./config/config");

const environment = process.env.NODE_ENV || 'development';
const dbConfig = config[environment];
const sequelize = new Sequelize(dbConfig.url, dbConfig);

const UserModel = require('./models/user')
const User = UserModel(sequelize, Sequelize)

app.get("/", (req, res) => {
  let message = "Hello World!";
  const shouldTransform = process.env.MESSAGE_STYLE === 'uppercase'

  if (shouldTransform) {
    message = message.toUpperCase();
  }

  res.json({message});
});

app.get("/port", (req, res) => {
  res.json({ port });
})

app.get("/api/users", async (req, res) => {
  const users = await User.findAll();
  res.json({ users })
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
