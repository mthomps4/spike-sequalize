const express = require("express");
const app = express();
const port = process.env.PORT;

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

app.get("/users", (req, res) => {
  // Need to be connected to Database
  // Need to use Users model for Users.find()
  // const users = await Users.find()
  // res.json({ users })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
