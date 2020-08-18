const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const {Sequelize} = require('sequelize');
const app = express();
const port = process.env.PORT;

// Database Utils
const config = require("./config/config");
const environment = process.env.NODE_ENV || 'development';
const dbConfig = config[environment];
const sequelize = new Sequelize(dbConfig.url, dbConfig);

const UserModel = require('./models/user')
const User = UserModel(sequelize, Sequelize)

// Auth Utils 
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const hashPassword = (plainPassword) => bcrypt.hashSync(plainPassword, salt);

// simple JWT auth 
// https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
const authenticateToken = (req, res, next) => {
  // Gather the jwt access token from the request header
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401) // if there isn't any token

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next() // pass the execution off to whatever request the client intended
  })
}

const generateAccessToken = (user) => {
  // expires after half and hour (1800 seconds = 30 minutes)
  const {id, email} = user;
  return jwt.sign({id, email}, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

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

app.get("/signup", async (req, res) => {
  const {firstName, lastName, email, password, passwordConfirmation} = req; 

  if (!email) {
    return res.status(400).send('Password Confirmation does not match'); 
  }

  if (password !== passwordConfirmation) {
    return res.status(400).send('Password Confirmation does not match');
  }

  // Any other schema validations here... 

  const passwordHash = hashPassword(password);
  const user = await User.create({firstName, lastName, email, passwordHash })

  if(!user) {
    return res.status(500).send('Unable to create user');
  }

  const token = generateAccessToken(user);

  res.json({error: null, data: {user, token}})
})

app.get("/login", (req, res) => {
  const {email, password} = req; 
  const user = User.findOne({email: email});

  if(!user) {
    return res.status(403).send('No user found');
  }

  const match = bcrypt.compare(password, user.passwordHash);

  if (match) {
    const token = generateAccessToken(user);
    return res.json({error: null, data: {user, token}})
  }

  return res.status(403).send('Incorrect email or password');
});

app.get("/logout", (req, res) => {
  // we aren't storing the token in the DB here... Client will just drop context.
})

app.get("/api/protected", authenticateToken, (req, res) => {
  res.json({ message: "YOU ARE AUTHED!"});
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
